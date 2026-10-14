<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Events\User\UserActivity;
use App\Events\User\UserNotification;
use App\Helpers\HumanReadable;
use App\Http\Controllers\Controller;
use App\Http\Resources\Events\AllEvents;
use App\Mail\EventCreatedEmail;
use App\Models\EventDiscount\EventDiscount;
use App\Models\Events\Event;
use App\Models\Events\EventBooking;
use App\Models\Events\EventFile;
use App\Models\Events\EventFilePayment;
use App\Models\Events\EventPayment;
use App\Models\Events\EventReview;
use App\Models\Events\EventTimeSlot;
use App\Models\Events\FavoriteEvent;
use App\Models\FileManager\FileManager;
use App\Notifications\EventCreateNotification;
use App\Notifications\HostToUserCancelEventEmail;
use App\User;
use Carbon\Carbon;
use DateTimeZone;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Image;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Illuminate\Support\Facades\Notification;

class UserEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $status_code = 200;


    public function allPublicEvents(Request $request)
    {
        // return $request->queryData['eventType']?"yes":"";
        event(new UserActivity(request()->ip()));
        $collection = collect($request->queryData['eventType']);
        $intersect = $collection->intersect(["Discussion", "Appointments", "Training", "Webinars"]);
        // use UTC for all now checks
        $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');

        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();

            if (count($request->eventType) > 0 && $intersect->count() > 0) {

                $events = Event::where('event_type', $request->queryData['eventType'] ? $request->queryData['eventType'] : $intersect->all())
                    ->where(function ($q) use ($request) {
                        if ($request->queryData['searchQuery']) {
                            $q->where('event_title', 'LIKE', "%" . $request->queryData['searchQuery'] . "%");
                        }
                    })->where(function ($q) use ($request) {
                        if ($request->queryData['subCategories'] > 0 || $request->queryData['categories'] > 0) {
                            $q->where('event_sub_category', $request->queryData['subCategories'])->orWhere('event_category', $request->queryData['categories']);
                        }
                    })
                    ->with(['EventTimeSlot' => function ($q) use ($request, $utcNow) {
                        $q->where('status', 'enabled')->whereColumn('total_seats', '>', 'booked_seats')->where('start_date_time', '>', $utcNow)->orderBy('start_date_time')->get();
                    }, 'EventFile', 'EventDiscount', 'EventActivity', 'EventFilePayment', 'EventCreateUser' => function ($q) {
                        $q->select('id', 'name', 'username')->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }, 'EventReviews' => function ($q) {
                            $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                                ->groupBy('host_id');
                        }]);
                    }, 'FavoriteEvents' => function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    }, 'EventReviews' => function ($q) {
                        $q->selectRaw('event_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                            ->groupBy('event_id');
                    }])->whereHas('EventTimeSlot', function ($q) use ($request, $utcNow) {
                        $q->where('start_date_time', '>', $utcNow);
                        if (isset($request->queryData['cost']) && $request->queryData['cost'] > 0) {
                            $q->where('cost', '<=', $request->queryData['cost']);
                        }
                    })->where('event_visible', 1)->where('status', 1)->orderBy('id', 'desc')->paginate(12);
            } else {

                $events = Event::where('is_active',1)->with(['EventTimeSlot' => function ($q) use ($request, $utcNow) {
                    $q->where('status', 'enabled')->whereColumn('total_seats', '>', 'booked_seats')->where('start_date_time', '>', $utcNow)->orderBy('start_date_time')->get();
                }, 'EventFile', 'EventDiscount', 'EventActivity', 'EventFilePayment', 'EventCreateUser' => function ($q) {
                    $q->select('id', 'name', 'username')->with(['UserProfile' => function ($q) {
                        $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                    }, 'EventReviews' => function ($q) {
                        $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating, COUNT(event_reviews.id) AS review_count')
                            ->groupBy('host_id');
                    }]);
                }, 'FavoriteEvents' => function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                }, 'EventReviews' => function ($q) {
                    $q->selectRaw('event_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                        ->groupBy('event_id');
                }])->where(function ($q) use ($request) {
                    if (!empty($request->queryData['searchQuery'])) {
                        $q->where('event_title', 'LIKE', "%" . $request->queryData['searchQuery'] . "%");
                    }
                })->where(function ($q) use ($request) {
                    if ($request->queryData['subCategories'] > 0 || $request->queryData['categories'] > 0) {
                        $q->where('event_sub_category', $request->queryData['subCategories'])->orWhere('event_category', $request->queryData['categories']);
                    }
                })->whereHas('EventTimeSlot', function ($q) use ($request, $utcNow) {
                    $q->where('start_date_time', '>', $utcNow);
                    if (isset($request->queryData['cost']) && $request->queryData['cost'] > 0) {
                        $q->where('cost', '<=', $request->queryData['cost']);
                    }
                })->where('event_visible', 1)->where('status', 1)->orderBy('id', 'desc')->paginate(12);
            }

            return $this->EventFilter($events);
        } else {
            if (count($request->eventType) > 0) {
                $events = Event::where('is_active',1)->where('event_type', $request->queryData['eventType'] ? $request->queryData['eventType'] : $intersect->all())
                    ->where(function ($q) use ($request) {
                        if ($request->queryData['searchQuery']) {
                            $q->where('event_title', 'LIKE', "%" . $request->queryData['searchQuery'] . "%");
                        }
                    })->where(function ($q) use ($request) {
                        if ($request->queryData['subCategories'] > 0 || $request->queryData['categories'] > 0) {
                            $q->where('event_sub_category', $request->queryData['subCategories'])->orWhere('event_category', $request->queryData['categories']);
                        }
                    })->with(['EventTimeSlot' => function ($q) use ($request, $utcNow) {
                        $q->where('status', 'enabled')->whereColumn('total_seats', '>', 'booked_seats')->where('start_date_time', '>', $utcNow)->get();
                    }, 'EventFile', 'EventDiscount', 'EventActivity', 'EventFilePayment', 'EventCreateUser' => function ($q) {
                        $q->select('id', 'name', 'username')->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }, 'EventReviews' => function ($q) {
                            $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                                ->groupBy('host_id');
                        }]);
                    }, 'FavoriteEvents', 'EventReviews' => function ($q) {
                        $q->selectRaw('event_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                            ->groupBy('event_id');
                    }])->whereHas('EventTimeSlot', function ($q) use ($request, $utcNow) {
                        $q->where('start_date_time', '>', $utcNow);
                        if (isset($request->queryData['cost']) && $request->queryData['cost'] > 0) {
                            $q->where('cost', '<=', $request->queryData['cost']);
                        }
                    })->where('event_visible', 1)->where('status', 1)->orderBy('id', 'desc')->paginate(12);
            } else {
                $events = Event::where('is_active',1)->with(['EventTimeSlot' => function ($q) use ($request, $utcNow) {
                    $q->where('status', 'enabled')->whereColumn('total_seats', '>', 'booked_seats')->where('start_date_time', '>', $utcNow)->orderBy('start_date_time')->get();
                }, 'EventFile', 'EventDiscount', 'EventActivity', 'EventFilePayment', 'EventCreateUser' => function ($q) {
                    $q->select('id', 'name', 'username')->with(['UserProfile' => function ($q) {
                        $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                    }, 'EventReviews' => function ($q) {
                        $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating,COUNT(event_reviews.id) AS review_count')
                            ->groupBy('host_id');
                    }]);
                }, 'FavoriteEvents'])
                    ->where(function ($q) use ($request) {
                        if ($request->queryData['searchQuery']) {
                            $q->where('event_title', 'LIKE', "%" . $request->queryData['searchQuery'] . "%");
                        }
                    })->where(function ($q) use ($request) {
                        if ($request->queryData['subCategories'] > 0 || $request->queryData['categories'] > 0) {
                            $q->where('event_sub_category', $request->queryData['subCategories'])->orWhere('event_category', $request->queryData['categories']);
                        }
                    })->whereHas('EventTimeSlot', function ($q) use ($request, $utcNow) {
                        $q->where('start_date_time', '>', $utcNow);
                        if (isset($request->queryData['cost']) && $request->queryData['cost'] > 0) {
                            $q->where('cost', '<=', $request->queryData['cost']);
                        }
                    })->where('event_visible', 1)->where('status', 1)->orderBy('id', 'desc')->paginate(12);
            }

            return $this->EventFilter($events);
        }
    }
    // ::::::: Edit Event Fetch Details Following Type :::::::::
    public function getEditEvents(Request $request)
    {
        $user = auth()->user();
        $validator = Validator::make($request->all(), [
            'FollowingBy' => 'required',
            'EventId' => 'required',
            // 'SlotId' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }

        $eventCount = Event::where('user_fk_id', $user->id)->where('id', $request->EventId)->get();
        if ($eventCount->count() == 0) {
            return response()->json(["status" => "failed", "messages" => "you don`t have access to edit this"]);
        }

        // helper to normalise slot datetimes to UTC
        $toUtcSlot = function ($slot) {
            // preserve originals if null
            $origStartDT = $slot->start_date_time ?? ($slot->start_date . ' ' . ($slot->start_time ?? '00:00:00'));
            $origEndDT = $slot->end_date_time ?? ($slot->end_date . ' ' . ($slot->end_time ?? '00:00:00'));

            $utcStart = Carbon::parse($origStartDT)->setTimezone('UTC');
            $utcEnd = Carbon::parse($origEndDT)->setTimezone('UTC');

            $slot->start_date_time = $utcStart->format('Y-m-d H:i:s');
            $slot->end_date_time = $utcEnd->format('Y-m-d H:i:s');

            $slot->start_date = $utcStart->format('Y-m-d');
            $slot->end_date = $utcEnd->format('Y-m-d');

            $slot->start_time = $utcStart->format('H:i:s');
            $slot->end_time = $utcEnd->format('H:i:s');

            return $slot;
        };

        if ($request->FollowingBy === "ThisSlot") {
            $events = Event::with(['EventFile'])->where('id', $request->EventId)->where('user_fk_id', $user->id)->first();

            $slotCollection = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->where('id', $request->SlotId)
                ->get()
                ->unique('start_time')
                ->values();

            // gather unique start/end dates based on UTC-normalised slots
            $utcSlots = $slotCollection->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });

            $startDates = $utcSlots->pluck('start_date')->unique()->values()->all();
            $endDates = $utcSlots->pluck('end_date')->unique()->values()->all();
            $event_time_slot = $utcSlots->all();

              if (!empty($events) && count($event_time_slot) > 0) {
                  $events['event_start_dates'] = $startDates;
                  $events['event_end_dates'] = $endDates;
                  $events['event_time_slot'] = $event_time_slot;
                  $events['has_active_bookings'] = $this->scopeHasActiveBookings($events, $request);
                  $events['title_locked'] = $events['has_active_bookings'];
              }

            return response()->json(['status' => $this->status_code, 'message' => 'Events Edit fetch Successfully', 'data' => $events]);
        } else if ($request->FollowingBy === "FollowingSlots") {
            $slotGet = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->first();
            $events = Event::with(['EventFile'])->where('id', $request->EventId)->where('user_fk_id', $user->id)->first();

            // find slots that match same start/end time as slotGet, then normalise to UTC
            $slotCollection = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->where('end_time', Carbon::parse($slotGet->end_time)->format('H:i:s'))
                ->where('start_time', Carbon::parse($slotGet->start_time)->format('H:i:s'))
                ->orderBy('start_date')
                ->get()
                ->unique('start_time')
                ->values();

            $slotStartDatesRaw = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->where('start_date_time', '>=', $slotGet->start_date_time)
                ->orderBy('start_date')
                ->get();

            $slotEndDatesRaw = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->where('start_date_time', '>=', $slotGet->start_date_time)
                ->orderBy('start_date')
                ->get();

            // normalise collection to UTC
            $utcSlots = $slotCollection->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });

            $startDates = $utcSlots->pluck('start_date')->unique()->values()->all();

            // For start/end date pools we normalise each record's start/end datetime and then extract dates
            $utcStartPool = $slotStartDatesRaw->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });
            $utcEndPool = $slotEndDatesRaw->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });

            $startDates = $utcStartPool->pluck('start_date')->unique()->values()->all();
            $endDates = $utcEndPool->pluck('end_date')->unique()->values()->all();

            $event_time_slot = $utcSlots->all();

              if (!empty($events) && count($event_time_slot) > 0) {
                  $events['event_start_dates'] = $startDates;
                  $events['event_end_dates'] = $endDates;
                  $events['event_time_slot'] = $event_time_slot;
                  $events['has_active_bookings'] = $this->scopeHasActiveBookings($events, $request);
                  $events['title_locked'] = $events['has_active_bookings'];
              }

            return response()->json(['status' => $this->status_code, 'message' => 'Events Edit fetch Successfully', 'data' => $events]);
        } else if ($request->FollowingBy === "ThisEvent") {
            $events = Event::with(['EventFile'])->where('id', $request->EventId)->where('user_fk_id', $user->id)->first();

            $slotCollection = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->orderBy('start_date')
                ->get()
                ->unique('start_time')
                ->values();

            $slotStartDatesRaw = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->orderBy('start_date')
                ->get();

            $slotEndDatesRaw = EventTimeSlot::where('event_fk_id', $request->EventId)
                ->orderBy('start_date')
                ->get();

            $utcSlots = $slotCollection->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });

            $utcStartPool = $slotStartDatesRaw->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });
            $utcEndPool = $slotEndDatesRaw->map(function ($s) use ($toUtcSlot) {
                return $toUtcSlot($s);
            });

            $startDates = $utcStartPool->pluck('start_date')->unique()->values()->all();
            $endDates = $utcEndPool->pluck('end_date')->unique()->values()->all();
            $event_time_slot = $utcSlots->all();

              if (!empty($events) && count($event_time_slot) > 0) {
                  $events['event_start_dates'] = $startDates;
                  $events['event_end_dates'] = $endDates;
                  $events['event_time_slot'] = $event_time_slot;
                  $events['has_active_bookings'] = $this->scopeHasActiveBookings($events, $request);
                  $events['title_locked'] = $events['has_active_bookings'];
              }

            return response()->json(['status' => $this->status_code, 'message' => 'Events Edit fetch Successfully', 'data' => $events]);
        }

        // fallback (shouldn't reach)
        return response()->json(['status' => 'failed', 'messages' => 'invalid FollowingBy']);
    }

    public function loginUserEvents(Request $request)
    {
        // normalize to UTC
        $now = Carbon::now('UTC');

        $startDateUtc = Carbon::parse($request->startDate)->setTimezone('UTC')->format('Y-m-d');
        $endDateUtc = Carbon::parse($request->endDate)->setTimezone('UTC')->format('Y-m-d');

        $events = Event::where('status', '!=', 'cancelled')
            ->orderBy('id', 'desc')
            ->where('user_fk_id', auth()->user()->id)
            ->with([
                'EventTimeSlot' => function ($q) use ($startDateUtc, $endDateUtc) {
                    $q->whereBetween('start_date', [$startDateUtc, $endDateUtc])
                        ->orWhereBetween('end_date', [$startDateUtc, $endDateUtc]);
                },
                'EventFile',
                'EventBooking',
                'EventDiscount',
                'EventActivity',
                'EventFilePayment',
                'EventCreateUser',
                'FavoriteEvents'
            ])->get();

        $event = [];
        $BookedEvents = [];
        $SlotIds = [];
        $EventIds = [];
        $payments = EventPayment::where('user_fk_id', auth()->user()->id)->get();
        foreach ($payments as $payment) {
            $SlotIds[] = $payment->event_time_slot_id;
            $EventIds[] = $payment->event_fk_id;
        }

        $eventsBooked = Event::where('status', '!=', 'cancelled')
            ->whereIn('id', $EventIds)
            ->with(['EventBooking' => function ($q) use ($SlotIds) {
                $q->whereIn('event_slot_id', $SlotIds);
            }])->get();

        foreach ($eventsBooked as $BookEvent) {
            foreach (
                $BookEvent->EventBooking
                    ->where('p_user_id', auth()->user()->id)
                    ->where('status', 'enabled')
                    ->whereBetween('start_date', [$startDateUtc, $endDateUtc]) as $bookSlot
            ) {

                $BookedEvents[] = [
                    'id' => $BookEvent->id,
                    'eventTitle' => $BookEvent->event_title,
                    'meetingRoomId' => $bookSlot->meeting_room_id,
                    'booking' => '0',
                    'userId' => $BookEvent->h_user_id,
                    'eventType' => $BookEvent->event_type,
                    'slotId' => $bookSlot->event_slot_id,
                    'eventId' => $bookSlot->event_fk_id,
                    'status' => $bookSlot->status,
                    'startDate' => $bookSlot->start_date,
                    'endDate' => $bookSlot->end_date,
                    'startDateTime' => Carbon::parse($bookSlot->start_date_time)->setTimezone('UTC')->format('Y-m-d H:i:s'),
                    'endDateTime' => Carbon::parse($bookSlot->end_date_time)->setTimezone('UTC')->format('Y-m-d H:i:s'),
                    'startTime' => Carbon::parse($bookSlot->start_time)->setTimezone('UTC')->format('H:i:s'),
                    'rememberToken' => $BookEvent->remember_token,
                    'timeZone' => 'UTC',
                    'endTime' => Carbon::parse($bookSlot->end_time)->setTimezone('UTC')->format('H:i:s'),
                    'bookedSeats' => $bookSlot->booked_seats,
                ];
            }
        }

        foreach ($events as $eventIndex) {
            foreach ($eventIndex->EventTimeSlot->where('status', '!=', 'cancelled') as $slot) {
                $event[] = [
                    'id' => $eventIndex->id,
                    'eventTitle' => $eventIndex->event_title,
                    'meetingRoomId' => $slot->meeting_room_id,
                    'booking' => $eventIndex->EventBooking->where('status', 'enabled')->where('event_slot_id', $slot->id)->count(),
                    'userId' => $eventIndex->user_fk_id,
                    'eventType' => $eventIndex->event_type,
                    'slotId' => $slot->id,
                    'eventId' => $slot->event_fk_id,
                    'startDate' => $slot->start_date,
                    'status' => $slot->status,
                    'endDate' => $slot->end_date,
                    'startDateTime' => Carbon::parse($slot->start_date_time)->setTimezone('UTC')->format('Y-m-d H:i:s'),
                    'endDateTime' => Carbon::parse($slot->end_date_time)->setTimezone('UTC')->format('Y-m-d H:i:s'),
                    'startTime' => Carbon::parse($slot->start_time)->setTimezone('UTC')->format('H:i:s'),
                    'rememberToken' => $eventIndex->remember_token,
                    'timeZone' => 'UTC',
                    'endTime' => Carbon::parse($slot->end_time)->setTimezone('UTC')->format('H:i:s'),
                    'bookedSeats' => $slot->booked_seats,
                ];
            }
        }

        return response()->json([
            'status' => $this->status_code,
            'message' => 'Events fetch Successfully',
            'data' => ["Create" => $event, "Booked" => $BookedEvents]
        ]);
    }

    public function loginUserMyEvents(Request $request)
    {
        // use UTC for comparisons
        $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');

        try {
            // Build base query
            $baseQuery = Event::orderBy('id', 'desc')
                ->where('user_fk_id', auth()->user()->id)
                ->with([
                    'EventTimeSlot' => function ($q) use ($utcNow) {
                        $q->where('status', 'enabled')
                            ->whereColumn('total_seats', '>', 'booked_seats')
                            ->where('start_date_time', '>', $utcNow)
                            ->orderBy('start_date_time', 'ASC')
                            ->get();
                    },
                    'EventFile',
                    'EventBooking',
                    'EventDiscount',
                    'EventActivity',
                    'EventFilePayment',
                    'EventCreateUser',
                    'FavoriteEvents'
                ]);

            // Apply search filter
            if ($request->searchQuery) {
                $baseQuery->where(function ($q) use ($request) {
                    $q->where('event_title', 'LIKE', "%$request->searchQuery%")
                        ->orWhereHas('EventCreateUser', function ($query) use ($request) {
                            $query->where('name', 'LIKE', "%$request->searchQuery%");
                        });
                });
            }

            // Apply status filter (only if not "All")
            if ($request->filterBy && $request->filterBy != "All") {
                $baseQuery->whereHas('EventBooking', function ($query) use ($request, $utcNow) {
                    if ($request->filterBy == "Cancelled") {
                        $query->whereIn('status', ["cancelled", "cancelledByHost"]);
                    } elseif ($request->filterBy == "Completed") {
                        $query->where('status', 'enabled')->where('end_date_time', '<=', $utcNow);
                    } elseif ($request->filterBy == "Upcoming") {
                        $query->where('status', 'enabled')->where('end_date_time', '>', $utcNow);
                    }
                });
            }

            $events = $baseQuery->paginate(20);

            return response()->json(['status' => $this->status_code, 'message' => 'Events fetch Successfully', 'data' => $events]);
        } catch (Exception $e) {
            return $e;
        }
    }
    public function  EventFilter($events)
    {
        event(new UserActivity(request()->ip()));
        return response()->json(['status' => $this->status_code, 'message' => "Data Loading...", 'EventData' => $events]);
    }

    public function myEventsIndex()
    {
        $events = Event::where('user_fk_id', auth()->user()->id)->orderBy('id', 'desc')->where('event_visible', 1)->where('status', 1)->paginate(40);
        return response()->json(['status' => $this->status_code, 'data' => $events]);
    }

    public function Create(Request $request)
    {
        event(new UserActivity(request()->ip()));

        // return $request->all(); 
        $validator =  Validator::make($request->all(), [
            'eventTitle' => 'required',
            'eventType' => 'required',
            'eventDescription' => 'required|min:150|max:600',
            'eventCategory' => 'required',
            'eventSubCategory' => 'required',
            'eventVisibility' => 'required',
            'eventTimeZone' => 'required',
            'eventImages' => 'required|array|min:1',
            'repeatNumber' => 'required',
            'eventStartDate' => 'required|array|min:1',
            'eventEndDate' => 'required|array|min:1',
            'eventTags' => 'required|array|min:1',
        ]);
        if (count($request->eventFiles) > 0) {
            $validator =  Validator::make($request->all(), [
                'eventTitle' => 'required',
                'eventType' => 'required',
                'eventDescription' => 'required|min:150|max:600',
                'eventCategory' => 'required|numeric',
                'eventSubCategory' => 'required|numeric',
                'eventVisibility' => 'required',
                'eventTimeZone' => 'required',
                'eventImages' => 'required|array|min:1',
                'repeatNumber' => 'required',
                'eventDurationSlots' => 'required|array|min:1',
                'eventStartDate' => 'required|array|min:1',
                'eventEndDate' => 'required|array|min:1',
                'eventTags' => 'required|array|min:1',
                'eventFiles' => 'required|array|min:1|max:10',
            ]);
        }
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        } else {
            // build TimeDateArray (inputs expected from client)
            $TimeDateArray = [];
            foreach ($request->eventDurationSlots as $TimeSlot) {
                $TimeDateArray[] = [
                    'StartTime' => $TimeSlot['startDateTime'],
                    'EndTime' => $TimeSlot['endDateTime'],
                    'Cost' => $TimeSlot['cost'],
                    'EventCostType' => $TimeSlot['eventCostType'],
                    'EventDuration' => $TimeSlot['eventDuration'],
                    'Seats' => $TimeSlot['seats'],
                    'StartDate' => $TimeSlot['startDateTime'],
                    'EndDate' => $TimeSlot['endDateTime'],
                    'Interval' => $TimeSlot['interval'],
                    // keep original pieces in case they are passed as separate date/time
                    'RawStartTime' => isset($TimeSlot['start_time']) ? $TimeSlot['start_time'] : (isset($TimeSlot['StartTime']) ? $TimeSlot['StartTime'] : null),
                    'RawEndTime' => isset($TimeSlot['end_time']) ? $TimeSlot['end_time'] : (isset($TimeSlot['EndTime']) ? $TimeSlot['EndTime'] : null),
                ];
            }

            // helper to convert local date/time to UTC Carbon (handles date-only, date+time, or separate time parts)
            $toUtc = function ($datePart, $timePart = null, $tz = null) {
                $tz = $tz ?: config('app.timezone') ?: 'UTC';
                // detect if datePart already contains a time component to avoid double time appending
                $dateHasTime = is_string($datePart) && preg_match('/\d{1,4}[-\/]\d{1,2}[-\/]\d{1,4}\s+\d{1,2}:\d{2}/', $datePart);
                if ($timePart && !$dateHasTime) {
                    // join and parse with provided timezone
                    return Carbon::parse(trim($datePart . ' ' . $timePart), $tz)->setTimezone('UTC');
                }
                // parse datePart as-is (it may be a date or a full datetime)
                return Carbon::parse($datePart, $tz)->setTimezone('UTC');
            };

            try {
                $user = Auth::user();
                DB::beginTransaction();
                $event = new Event();
                $event->event_files = json_encode($request->eventImages);
                $event->user_fk_id = $user->id;
                $event->event_title = $request->eventTitle;
                $event->event_type = $request->eventType == 'Webinar' ? 'Webinars' : $request->eventType;
                $event->event_repeat_type = $request->eventRepeatBy ? $request->eventRepeatBy : 'None';
                $event->event_repeat_by_day = json_encode($request->eventRepeatDays);
                $event->event_repeat_interval = $request->repeatNumber ? $request->repeatNumber : 1;
                $event->event_description = $request->eventDescription;
                $event->event_visible = $request->eventVisibility == "public" ? true : false;
                $event->event_category = $request->eventCategory;
                $event->event_sub_category = $request->eventSubCategory;
                $event->auto_accept_participant = $request->eventAutoParticipants;
                // store provided timezone for reference, but all stored date/time values will be UTC
                $event->timezone = $request->eventTimeZone ?? $request->tz ?? 'UTC';
                $event->duration = $request->eventDuration;
                $event->event_tags = json_encode($request->eventTags);
                $event->remember_token = Str::random(60);
                $event->save();

                if ($request->eventDiscount) {
                    $eventDiscount = new EventDiscount();
                    $eventDiscount->event_fk_id = $event->id;
                    $parts = explode(',', $request->eventDiscount);
                    $eventDiscount->people = $parts[0] ?? 0;
                    $eventDiscount->offer = $parts[1] ?? 0;
                    $eventDiscount->remember_token = Str::random(60);
                    $eventDiscount->save();
                }

                // Save time slots - convert all stored date/time to UTC
                if (count($request->eventStartDate) === count($request->eventEndDate) || count($request->eventDurationSlots) > 0) {
                    $clientTz = $request->eventTimeZone ?? $request->tz ?? 'UTC';
                    if ($request->eventRepeat && $request->eventRepeatBy != '') {
                        foreach ($TimeDateArray as $TimeSlot) {
                            foreach ($request->eventStartDate as $index => $startDateTime) {
                                // derive local time parts
                                $localTimePart = null;
                                $localEndTimePart = null;

                                // prefer explicit Raw* if present, otherwise try to extract from TimeSlot entries
                                if ($TimeSlot['RawStartTime']) {
                                    $localTimePart = Carbon::parse($TimeSlot['RawStartTime'])->format('H:i');
                                } elseif (isset($TimeSlot['StartTime'])) {
                                    $localTimePart = Carbon::parse($TimeSlot['StartTime'])->format('H:i');
                                }

                                if ($TimeSlot['RawEndTime']) {
                                    $localEndTimePart = Carbon::parse($TimeSlot['RawEndTime'])->format('H:i');
                                } elseif (isset($TimeSlot['EndTime'])) {
                                    $localEndTimePart = Carbon::parse($TimeSlot['EndTime'])->format('H:i');
                                }

                                // build local start datetime for comparison
                                $localStart = $localTimePart ? Carbon::parse($startDateTime . ' ' . $localTimePart, $clientTz) : Carbon::parse($startDateTime, $clientTz);

                                // check start is in future relative to client's timezone now
                                if ($localStart->greaterThan(Carbon::now($clientTz))) {
                                    // convert to UTC
                                    $utcStart = $toUtc($startDateTime, $localTimePart, $clientTz);
                                    $utcEnd = $toUtc($request->eventEndDate[$index], $localEndTimePart, $clientTz);

                                    $eventTimeSlot = new EventTimeSlot();
                                    $eventTimeSlot->event_fk_id = $event->id;
                                    $eventTimeSlot->meeting_room_id = rand(0, 9999) . substr(time(), -4) . Str::random(24);
                                    $eventTimeSlot->cost_type = $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free';
                                    $eventTimeSlot->cost = $TimeSlot['Cost'];
                                    $eventTimeSlot->duration = $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60;
                                    $eventTimeSlot->total_seats = $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20;

                                    // store date and time parts in UTC
                                    $eventTimeSlot->start_date = $utcStart->format('Y-m-d');
                                    $eventTimeSlot->end_date = $TimeSlot['Interval'] > 0 ? $utcEnd->addDays($TimeSlot['Interval'])->format('Y-m-d') : $utcEnd->format('Y-m-d');

                                    $eventTimeSlot->start_time = $utcStart->format('H:i:s');
                                    $eventTimeSlot->end_time = $TimeSlot['Interval'] > 0 ? $utcEnd->addDays($TimeSlot['Interval'])->format('H:i:s') : $utcEnd->format('H:i:s');

                                    $eventTimeSlot->start_date_time = $utcStart->format('Y-m-d H:i:s');
                                    $eventTimeSlot->end_date_time = $TimeSlot['Interval'] > 0 ? $utcEnd->addDays($TimeSlot['Interval'])->format('Y-m-d H:i:s') : $utcEnd->format('Y-m-d H:i:s');

                                    $eventTimeSlot->status = "enabled";
                                    $eventTimeSlot->remember_token = Str::random(60);
                                    $eventTimeSlot->save();
                                }
                            }
                        }
                    } else {
                        foreach ($TimeDateArray as $TimeSlot) {
                            // prefer explicit Raw* if present, otherwise try to extract from TimeSlot entries
                            $localStartDate = isset($TimeSlot['StartDate']) ? $TimeSlot['StartDate'] : null;
                            $localEndDate = isset($TimeSlot['EndDate']) ? $TimeSlot['EndDate'] : null;

                            // try to get time parts
                            $localTimePart = null;
                            $localEndTimePart = null;
                            if ($TimeSlot['RawStartTime']) {
                                $localTimePart = Carbon::parse($TimeSlot['RawStartTime'])->format('H:i');
                            } elseif (isset($TimeSlot['StartTime'])) {
                                $localTimePart = Carbon::parse($TimeSlot['StartTime'])->format('H:i');
                            }

                            if ($TimeSlot['RawEndTime']) {
                                $localEndTimePart = Carbon::parse($TimeSlot['RawEndTime'])->format('H:i');
                            } elseif (isset($TimeSlot['EndTime'])) {
                                $localEndTimePart = Carbon::parse($TimeSlot['EndTime'])->format('H:i');
                            }

                            // if StartDate contains datetime already, parse it accordingly
                            $utcStart = $localTimePart ? $toUtc($localStartDate, $localTimePart, $clientTz) : $toUtc($localStartDate, null, $clientTz);
                            $utcEnd = $localEndTimePart ? $toUtc($localEndDate, $localEndTimePart, $clientTz) : $toUtc($localEndDate, null, $clientTz);

                            $eventTimeSlot = new EventTimeSlot();
                            $eventTimeSlot->event_fk_id = $event->id;
                            $eventTimeSlot->meeting_room_id = rand(0, 9999) . substr(time(), -4) . Str::random(24);
                            $eventTimeSlot->cost_type = $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free';
                            $eventTimeSlot->cost = $TimeSlot['Cost'];
                            $eventTimeSlot->duration = $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60;
                            $eventTimeSlot->total_seats = $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20;

                            $eventTimeSlot->start_date = $utcStart->format('Y-m-d');
                            $eventTimeSlot->start_time = $utcStart->format('H:i:s');

                            $eventTimeSlot->end_date = $utcEnd->format('Y-m-d');
                            $eventTimeSlot->end_time = $utcEnd->format('H:i:s');

                            $eventTimeSlot->start_date_time = $utcStart->format('Y-m-d H:i:s');
                            $eventTimeSlot->end_date_time = $utcEnd->format('Y-m-d H:i:s');

                            $eventTimeSlot->status = "enabled";
                            $eventTimeSlot->remember_token = Str::random(60);
                            $eventTimeSlot->save();
                        }
                    }
                }

                if (count($request->eventFiles)) {
                    foreach ($request->eventFiles as $File) {
                        $eventFile = new EventFile();
                        $eventFile->event_fk_id = $event->id;
                        $eventFile->file_manager_id = $File['id'];
                        $eventFile->file_title = $File['name'];
                        $eventFile->file_description = $File['eventFileDescription'];
                        $eventFile->file_cost = (int)$File['eventFileCost'];
                        $eventFile->size = $File['size'];
                        $eventFile->remember_token = Str::random(60);
                        $eventFile->save();
                    }
                }

                // $details = [
                //     'body' => $event->event_title,
                //     'image' => json_decode($event->event_files, true)[0]['file_url'],
                //     'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id) . '" target="_blank">' . $event->event_title . '</a>',
                //     'description' => 'You created a new event',
                //     'greeting' => 'Hi ' . $user->name,
                //     'thanks' => 'Thank you for using ' . url('/') . '!',
                //     'actionText' => 'View Event',
                //     'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                //     'order_id' => $event->id
                // ];
                // $user->UserProfile;
                // Notification::send($user, new EventCreateNotification($details));
                event(new UserNotification($user));
                DB::commit();
                return response()->json(["status" => $this->status_code, "message" => "Event Created Successfully", "data" => $user]);
            } catch (\PDOException $e) {
                DB::rollBack();
                return $e;
            }
        }
    }

    public function UpdateEvent(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $event  = Event::where('id', $request->EventId)->where('user_fk_id', $user->id)->first();
        if (count($request->eventImages) > 0) {

            if (!empty($event)) {
                if (count($request->eventFiles) > 0) {
                    $validator =  Validator::make($request->all(), [
                        'EventId' => 'required',
                        'SlotId' => 'required',
                        'eventDescription' => 'required|min:150|max:600',
                        'eventVisibility' => 'required',
                        'eventImages' => 'required|array|min:1',
                        'repeatNumber' => 'required',
                        'eventStartDate' => 'required|array|min:1',
                        'eventEndDate' => 'required|array|min:1',
                        'eventTags' => 'required|array|min:1',
                        'followingBy' => 'required',
                        'eventFiles' => 'required|array|min:1|max:10',
                    ]);
                } else {
                    $validator =  Validator::make($request->all(), [
                        'EventId' => 'required',
                        'SlotId' => 'required',
                        'eventDescription' => 'required|min:150|max:600',
                        'eventVisibility' => 'required',
                        'eventImages' => 'required|array|min:1',
                        'repeatNumber' => 'required',
                        'eventStartDate' => 'required|array|min:1',
                        'eventEndDate' => 'required|array|min:1',
                        'followingBy' => 'required',
                        'eventTags' => 'required|array|min:1',
                    ]);
                }
                if ($validator->fails()) {
                    return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
                } else {
                    if ($this->hasAnyHistory($event)) {
                        return $this->createEventVersionFromUpdate($request, $event, $user);
                    }

                    $hasActiveBookings = $this->scopeHasActiveBookings($event, $request);
                    // $canEditRepeat = ($request->followingBy ?? '') === 'ThisEvent';
                    // $this->snapshotCompletedBookingsForEditableScope($event, $request);
                    // return $request->all(); 
                    $followingSlotsIds = [];
                    $followingSlotsUpdate = [];
                    $TimeDateArray = [];
                    $slotGet = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->first();
                    foreach ($request->eventDurationSlots as $TimeKey => $TimeSlot) {
                        $followingSlotsUpdate = EventTimeSlot::where('event_fk_id', $event->id)->where('id', $TimeSlot['id'])->get();

                        foreach ($followingSlotsUpdate as $followingSlotUpdate) {
                            $TimeDateArray[] = [
                                'StartTime' => Carbon::parse($TimeSlot['start_date_time'])->format('H:i:s'),
                                'EndTime' => Carbon::parse($TimeSlot['end_date_time'])->format('H:i:s'),
                                'EndDateTime' => Carbon::parse($TimeSlot['end_date_time'])->format('Y-m-d H:i:s'),
                                'StartDateTime' => Carbon::parse($TimeSlot['start_date_time'])->format('Y-m-d H:i:s'),
                                'RStartTime' => Carbon::parse($followingSlotUpdate->start_time)->format('H:i:s'),
                                'REndTime' => Carbon::parse($followingSlotUpdate->end_time)->format('H:i:s'),
                                'Cost' => $TimeSlot['cost'],
                                'EventCostType' => $TimeSlot['cost_type'],
                                'EventDuration' => Carbon::parse($TimeSlot['start_date_time'])->diffInMinutes(Carbon::parse($TimeSlot['end_date_time'])),
                                'Seats' => $TimeSlot['total_seats'],
                                'StartDate' => Carbon::parse($TimeSlot['start_date_time'])->format('Y-m-d'),
                                'EndDate' => Carbon::parse($TimeSlot['end_date_time'])->format('Y-m-d'),
                                'Interval' => Carbon::parse($TimeSlot['start_date_time'])->diffInDays(Carbon::parse($TimeSlot['end_date_time'])),
                                'id' => $TimeSlot['id'],
                            ];
                            $followingSlotsIds[] = $TimeSlot['id'];
                        }
                    }
                    // return $TimeDateArray;
                    try {
                        DB::beginTransaction();
                        $UpdateEvent = Event::where('id', $event->id)->update([
                            "event_title" => $hasActiveBookings ? $event->event_title : ($request->eventTitle ? $request->eventTitle : $event->event_title),
                            "event_files" => json_encode($request->eventImages),
                            "event_repeat_type" => $request->eventRepeatBy ? $request->eventRepeatBy : '',
                            "event_repeat_by_day" => json_encode($request->eventRepeatDays),
                            "event_repeat_interval" => $request->repeatNumber ? $request->repeatNumber : 1,
                            "event_tags" => json_encode($request->eventTags),
                            "event_description" => $request->eventDescription,
                            "event_visible" => $request->eventVisibility == "public" ? true : false,

                        ]);

                        if (count($request->eventStartDate) === count($request->eventEndDate) && count($request->eventDurationSlots) > 0) {
                            if ($request->eventRepeat && $request->eventRepeatBy != '') {
                                $bookingData = [];
                                foreach ($TimeDateArray as $TimeSlot) {
                                    foreach ($request->eventStartDate as $index => $startDateTime) {
                                        if ($request->followingBy === "FollowingSlots") {
                                            // $bookingData[]=['s_date_time'=>Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['RStartTime'])->format('H:i:s'))->format('Y-m-d H:i'),'end_date_time'=>Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['REndTime'])->format('H:i:s'))->format('Y-m-d H:i')];
                                            $bookingRecord = EventBooking::where('event_fk_id', $event->id)->where('start_date_time', Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['RStartTime'])->format('H:i:s'))->format('Y-m-d H:i:s'))->where('end_date_time', Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['REndTime'])->format('H:i:s'))->format('Y-m-d H:i:s'))->first();
                                            $bookingData[] = $bookingRecord;
                                            if (!empty(EventBooking::where('event_fk_id', $event->id)->where('start_date_time', Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['RStartTime'])->format('H:i:s'))->format('Y-m-d H:i'))->where('end_date_time', Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['REndTime'])->format('H:i:s'))->format('Y-m-d H:i'))->first())) {
                                                // $bookingData[]= EventBooking::where('event_fk_id',$event->id)->where('start_time',$TimeSlot['RStartTime'])->where('end_time',$TimeSlot['REndTime'])->first();
                                                $bookingRecordIndex = count($bookingData) - 1;
                                                if ($bookingRecordIndex >= 0 && !empty($bookingData[$bookingRecordIndex])) {
                                                    $bookingData[$bookingRecordIndex]['start_date_time_m'] = Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'))->format('Y-m-d H:i');
                                                }
                                            } else {

                                                // $bookingData[]=['s_date_time'=>Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['RStartTime'])->format('H:i:s'))->format('Y-m-d H:i'),'end_date_time'=>Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['REndTime'])->format('H:i:s'))->format('Y-m-d H:i')];
                                                EventTimeSlot::where('event_fk_id', $event->id)->where('start_date', '>=', Carbon::parse($slotGet->start_date)->format('Y-m-d'))->where('start_date_time', Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['RStartTime'])->format('H:i:s'))->format('Y-m-d H:i'))->where('end_date_time', Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['REndTime'])->format('H:i:s'))->format('Y-m-d H:i'))->update([
                                                    "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                    "cost" => $TimeSlot['Cost'],
                                                    "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                    "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                    "start_date" => Carbon::parse($startDateTime)->format('Y-m-d'),
                                                    "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                    "end_date" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index])->addDays($TimeSlot['Interval'])->format('Y-m-d') : Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                    "end_date_time" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i'))->addDays($TimeSlot['Interval'])->format('Y-m-d H:i') : Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i'))->format('Y-m-d H:i'),
                                                    "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                    "start_date_time" => Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                ]);
                                            }
                                            // if(empty($bookingData)){
                                            //    }else if(!empty($bookingData)){
                                            //     $data[]=EventTimeSlot::where('event_fk_id',$event->id)->where('start_time',$TimeSlot['RStartTime'])->where('end_time',$TimeSlot['REndTime'])->first();
                                            //    }

                                            //    $data[]=$followingSlotUpdate;

                                            // }

                                            // }
                                        } else if ($request->followingBy === "ThisSlot") {
                                            foreach ($request->eventStartDate as $index => $startDateTime) {
                                                if (empty(EventBooking::where('event_slot_id', $TimeSlot['id'])->first())) {
                                                    $eventUpdateTimeSlot =  EventTimeSlot::where('id', $TimeSlot['id'])->update([
                                                        "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                        "cost" => $TimeSlot['Cost'],
                                                        "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                        "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                        "start_date" => Carbon::parse($startDateTime)->format('Y-m-d'),
                                                        "end_date" => Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                        "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                        "end_date" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index])->addDays($TimeSlot['Interval'])->format('Y-m-d') : Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                        "end_date_time" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->addDays($TimeSlot['Interval'])->format('Y-m-d H:i') : Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                        "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                        "start_date_time" => Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                        //$eventTimeSlot->start_date = strtotime($TimeSlot['StartDate']);
                                                        //$eventTimeSlot->end_date = strtotime($TimeSlot['EndDate']);
                                                        //$eventTimeSlot->start_time = strtotime($TimeSlot['StartTime']);
                                                        //$eventTimeSlot->end_time = strtotime($TimeSlot['EndTime']);
                                                    ]);
                                                }
                                            }
                                        } else if ($request->followingBy === "ThisEvent") {
                                            // return $request->all();
                                            foreach ($request->eventStartDate as $index => $startDateTime) {
                                                if (empty(EventBooking::where('event_slot_id', $TimeSlot['id'])->first())) {
                                                    $eventUpdateTimeSlot =  EventTimeSlot::where('id', $TimeSlot['id'])->update([
                                                        "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                        "cost" => $TimeSlot['Cost'],
                                                        "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                        "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                        "start_date" => Carbon::parse($startDateTime)->format('Y-m-d'),
                                                        // "end_date" => Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                        "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                        "end_date" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index])->addDays($TimeSlot['Interval'])->format('Y-m-d') : Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                        "end_date_time" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->addDays($TimeSlot['Interval'])->format('Y-m-d H:i') : Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                        "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                        "start_date_time" => Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                        // //  $eventTimeSlot->start_date = strtotime($TimeSlot['StartDate']);
                                                        //  $eventTimeSlot->end_date = strtotime($TimeSlot['EndDate']);
                                                        // $eventTimeSlot->start_time = strtotime($TimeSlot['StartTime']);
                                                        //  $eventTimeSlot->end_time = strtotime($TimeSlot['EndTime']);
                                                    ]);
                                                }
                                            }
                                        }
                                    }
                                }
                                // return $EventTimeSlot;
                                // return $bookingData;


                            } else {
                                if ($request->followingBy === "FollowingSlots") {
                                    foreach ($TimeDateArray as $TimeSlot) {
                                        foreach ($followingSlotsUpdate as $followingSlotUpdate) {
                                            if (empty(EventBooking::where('event_fk_id', $event->id)->where('start_time', $followingSlotUpdate->start_time)->where('end_time', $followingSlotUpdate->end_time)->first())) {
                                                EventTimeSlot::where('event_fk_id', $event->id)->where('start_time', $followingSlotUpdate->start_time)->where('end_time', $followingSlotUpdate->end_time)->update([
                                                    "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                    "cost" => $TimeSlot['Cost'],
                                                    "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                    "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                    "start_date" => Carbon::parse($TimeSlot['StartDate'])->format('Y-m-d'),
                                                    "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                    "end_date" => Carbon::parse($TimeSlot['EndDate'])->format('Y-m-d'),
                                                    "end_date_time" => Carbon::parse($TimeSlot['EndTime'])->format('Y-m-d H:i'),
                                                    "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                    "start_date_time" => Carbon::parse($TimeSlot['StartTime'])->format('Y-m-d H:i'),
                                                ]);
                                            }
                                        }
                                    }
                                } else if ($request->followingBy === "ThisSlot") {
                                    // return $TimeDateArray;
                                    foreach ($TimeDateArray as $TimeSlot) {
                                        if (empty(EventBooking::where('event_slot_id', $TimeSlot['id'])->first())) {
                                            $eventUpdateTimeSlot =  EventTimeSlot::where('id', $TimeSlot['id'])->update([
                                                "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                "cost" => $TimeSlot['Cost'],
                                                "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                "start_date" => Carbon::parse($TimeSlot['StartDate'])->format('Y-m-d'),
                                                "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                "end_date" => Carbon::parse($TimeSlot['EndDate'])->format('Y-m-d'),
                                                "end_date_time" => Carbon::parse($TimeSlot['EndDateTime'])->format('Y-m-d H:i'),
                                                "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                "start_date_time" => Carbon::parse($TimeSlot['StartDateTime'])->format('Y-m-d H:i'),
                                            ]);
                                        }
                                    }
                                } else if ($request->followingBy === "ThisEvent") {
                                    foreach ($request->eventStartDate as $index => $startDateTime) {
                                        if (empty(EventBooking::where('event_slot_id', $TimeSlot['id'])->first())) {
                                            $eventUpdateTimeSlot =  EventTimeSlot::where('id', $TimeSlot['id'])->update([
                                                "cost_type" => $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free',
                                                "cost" => $TimeSlot['Cost'],
                                                "duration" => $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60,
                                                "total_seats" => $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20,
                                                "start_date" => Carbon::parse($startDateTime)->format('Y-m-d'),
                                                "end_date" => Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                "start_time" => Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'),
                                                "end_date" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index])->addDays($TimeSlot['Interval'])->format('Y-m-d') : Carbon::parse($request->eventEndDate[$index])->format('Y-m-d'),
                                                "end_date_time" => $TimeSlot['Interval'] > 0 ? Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->addDays($TimeSlot['Interval'])->format('Y-m-d H:i') : Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                "end_time" => Carbon::parse($TimeSlot['EndTime'])->format('H:i:s'),
                                                "start_date_time" => Carbon::parse($startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s'))->format('Y-m-d H:i'),
                                                // //  $eventTimeSlot->start_date = strtotime($TimeSlot['StartDate']);
                                                //  $eventTimeSlot->end_date = strtotime($TimeSlot['EndDate']);
                                                // $eventTimeSlot->start_time = strtotime($TimeSlot['StartTime']);
                                                //  $eventTimeSlot->end_time = strtotime($TimeSlot['EndTime']);
                                            ]);
                                        }
                                    }
                                }
                            }
                        }

                        if (count($request->removedEventSlot) > 0) {
                            $TimeDateRemove = [];
                            foreach ($request->removedEventSlot as $TimeKey => $RemoveTimeSlot) {
                                $TimeDateRemove[] = [
                                    'StartTime' => Carbon::parse($RemoveTimeSlot['start_date_time'])->format('H:i:s'),
                                    'EndTime' => Carbon::parse($RemoveTimeSlot['end_date_time'])->format('H:i:s'),
                                    'Cost' => $RemoveTimeSlot['cost'],
                                    'EventCostType' => $RemoveTimeSlot['cost_type'],
                                    'EventDuration' => Carbon::parse($RemoveTimeSlot['start_date_time'])->diffInMinutes(Carbon::parse($RemoveTimeSlot['end_date_time'])),
                                    'Seats' => $RemoveTimeSlot['total_seats'],
                                    'StartDate' => $RemoveTimeSlot['start_date'],
                                    'EndDate' => $RemoveTimeSlot['end_date'],
                                    'Interval' => Carbon::parse($RemoveTimeSlot['start_date_time'])->diffInDays(Carbon::parse($RemoveTimeSlot['end_date_time'])),
                                    'id' => $RemoveTimeSlot['id'],
                                    'eventId' => $RemoveTimeSlot['event_fk_id'],
                                ];
                            }

                            if ($request->followingBy === "FollowingSlots") {
                                foreach ($TimeDateRemove as $SlotRemoved) {
                                    $followingSlots = EventTimeSlot::where('event_fk_id', $SlotRemoved['eventId'])->where('start_time', $SlotRemoved['StartTime'])->where('end_time', $SlotRemoved['EndTime'])->get();
                                    foreach ($followingSlots as $followingSlot) {
                                        if (empty(EventBooking::where('event_fk_id', $event->id)->where('start_time', $SlotRemoved['StartTime'])->where('end_time', $SlotRemoved['EndTime'])->first())) {
                                            EventTimeSlot::where('id', $followingSlot['id'])->delete();
                                        }
                                    }
                                }
                            } else if ($request->followingBy === "ThisSlot") {
                                foreach ($TimeDateRemove as $SlotRemoved) {
                                    if (empty(EventBooking::where('event_slot_id', $SlotRemoved['id'])->first())) {
                                        EventTimeSlot::where('id', $SlotRemoved['id'])->delete();
                                    }
                                }
                            }
                        }

                        if (count($request->eventFiles) > 0) {
                            foreach ($request->eventFiles as $File) {
                                if (!empty($File["file_manager_id"])) {
                                    if (empty(EventFile::where('file_manager_id', $File["file_manager_id"])->first())) {

                                        $eventFile = new EventFile();
                                        $eventFile->event_fk_id = $event->id;
                                        $eventFile->file_manager_id = $File['id'];
                                        $eventFile->file_title = $File['name'];
                                        $eventFile->file_description = $File['file_description'];
                                        $eventFile->file_cost = (int)$File['file_cost'];
                                        $eventFile->size = $File['size'];
                                        $eventFile->remember_token = Str::random(60);
                                        $eventFile->save();
                                    }
                                } else {
                                    $eventFile = new EventFile();
                                    $eventFile->event_fk_id = $event->id;
                                    $eventFile->file_manager_id = $File['id'];
                                    $eventFile->file_title = $File['name'];
                                    $eventFile->file_description = $File['file_description'];
                                    $eventFile->file_cost = (int)$File['file_cost'];
                                    $eventFile->size = $File['size'];
                                    $eventFile->remember_token = Str::random(60);
                                    $eventFile->save();
                                }
                            }
                        }
                        if (count($request->removedEventFiles) > 0) {
                            // foreach ($request->eventFiles as $File) {
                            $delete = EventFile::whereIn('id', $request->removedEventFiles)->delete();
                            // }
                        }
                        $details = [
                            'body' => $event->event_title,
                            'image' => json_decode($event->event_files, true)[0]['file_url'],
                            'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id) . '" target="_blank">' . $event->event_title . '</a>',
                            'description' => 'You created a new event',
                            'greeting' => 'Hi ' . $user->name,
                            'thanks' => 'Thank you for using ' . url('/') . '!',
                            'actionText' => 'View Updated Event',
                            'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id),
                            'order_id' => $event->id
                        ];
                        // Notification::send($user, new EventCreateNotification($details));
                        event(new UserNotification($user));
                        DB::commit();
                        return response()->json(["status" => $this->status_code, "message" => "Event Updated Successfully", "data" => $event]);
                    } catch (\PDOException $e) {
                        DB::rollBack();
                        return $e;
                    }
                }
            } else {
                return response()->json(["status" => 'failed', "message" => "!error", "data" => []]);
            }
        } else {
            return response()->json(["status" => 'failed', "message" => "event min 1 image is required", "data" => []]);
        }
    }

    private function hasAnyHistory(Event $event): bool
    {
        return EventBooking::where('event_fk_id', $event->id)->exists()
            || EventPayment::where('event_fk_id', $event->id)->exists()
            || EventReview::where('event_id', $event->id)->exists();
    }

    private function scopeHasActiveBookings(Event $event, Request $request): bool
    {
        return EventBooking::where('event_fk_id', $event->id)
              ->where('status', 'enabled')
              ->where('end_date_time', '>', Carbon::now('UTC')->format('Y-m-d H:i:s'))
              ->exists();
      }

      private function snapshotCompletedBookingsForEditableScope(Event $event, Request $request): void
      {
          $scopeSlotIds = $this->getEditableScopeSlotIds($event, $request);

          if (count($scopeSlotIds) <= 0) {
              return;
          }

          $snapshotPayload = json_encode($this->buildEventSnapshotPayload($event));

          EventBooking::whereIn('event_slot_id', $scopeSlotIds)
              ->where('status', 'enabled')
              ->where('end_date_time', '<=', Carbon::now('UTC')->format('Y-m-d H:i:s'))
              ->where(function ($query) {
                  $query->whereNull('event_data')->orWhere('event_data', '');
              })
              ->update([
                  'event_data' => $snapshotPayload,
              ]);
      }

      private function buildEventSnapshotPayload(Event $event): array
      {
          return [
              'event_title' => $event->event_title,
              'event_description' => $event->event_description,
              'event_files' => $event->event_files,
              'event_type' => $event->event_type,
              'event_visible' => $event->event_visible,
              'remember_token' => $event->remember_token,
          ];
      }

    private function getEditableScopeSlotIds(Event $event, Request $request): array
    {
        $followingBy = $request->followingBy ?? $request->FollowingBy;
        $slotId = $request->SlotId ?? $request->slotId;

        if ($followingBy === 'ThisEvent') {
            return EventTimeSlot::where('event_fk_id', $event->id)->pluck('id')->all();
        }

        if ($followingBy === 'ThisSlot') {
            return EventTimeSlot::where('event_fk_id', $event->id)
                ->where('id', $slotId)
                ->pluck('id')
                ->all();
        }

        if ($followingBy === 'FollowingSlots') {
            $slot = EventTimeSlot::where('event_fk_id', $event->id)->where('id', $slotId)->first();
            if (! $slot) {
                return [];
            }

            return EventTimeSlot::where('event_fk_id', $event->id)
                ->where('start_date_time', '>=', $slot->start_date_time)
                ->where('start_time', Carbon::parse($slot->start_time)->format('H:i:s'))
                ->where('end_time', Carbon::parse($slot->end_time)->format('H:i:s'))
                ->pluck('id')
                ->all();
        }

        return [];
    }

    private function createEventVersionFromUpdate(Request $request, Event $event, $user)
    {
        try {
            DB::beginTransaction();

            $event->is_active = 0;
            $event->updated_at = now();
            $event->save();

            $newEvent = $event->replicate();
            $newEvent->event_title = $request->eventTitle ? $request->eventTitle : $event->event_title;
            $newEvent->event_files = json_encode($request->eventImages);
            $newEvent->event_repeat_type = $request->eventRepeatBy ? $request->eventRepeatBy : '';
            $newEvent->event_repeat_by_day = json_encode($request->eventRepeatDays);
            $newEvent->event_repeat_interval = $request->repeatNumber ? $request->repeatNumber : 1;
            $newEvent->event_tags = json_encode($request->eventTags);
            $newEvent->event_description = $request->eventDescription;
            $newEvent->event_visible = $request->eventVisibility == "public" ? true : false;
            $newEvent->remember_token = Str::random(60);
            $newEvent->version = ($event->version ?? 1) + 1;
            $newEvent->parent_event_id = $event->parent_event_id ?: $event->id;
            $newEvent->is_active = 1;
            $newEvent->created_at = now();
            $newEvent->updated_at = now();
            $newEvent->save();

            if ($event->EventDiscount) {
                $discount = $event->EventDiscount->replicate();
                $discount->event_fk_id = $newEvent->id;
                $discount->remember_token = Str::random(60);
                $discount->created_at = now();
                $discount->updated_at = now();
                $discount->save();
            }

            $this->storeUpdatedEventVersionSlots($request, $newEvent);
            $this->storeUpdatedEventVersionFiles($request, $newEvent);

            event(new UserNotification($user));
            DB::commit();

            return response()->json([
                "status" => $this->status_code,
                "message" => "Event has active bookings, update successfully",
                "data" => $newEvent
            ]);
        } catch (\PDOException $e) {
            DB::rollBack();
            return $e;
        }
    }

    private function storeUpdatedEventVersionSlots(Request $request, Event $event): void
    {
        if (count($request->eventStartDate) !== count($request->eventEndDate) && count($request->eventDurationSlots) <= 0) {
            return;
        }

        if ($request->eventRepeat && $request->eventRepeatBy != '') {
            foreach ($request->eventDurationSlots as $timeSlot) {
                foreach ($request->eventStartDate as $index => $startDateTime) {
                    $startAt = Carbon::parse($startDateTime . ' ' . Carbon::parse($timeSlot['start_date_time'])->format('H:i:s'), 'UTC');
                    $endAt = Carbon::parse($request->eventEndDate[$index] . ' ' . Carbon::parse($timeSlot['end_date_time'])->format('H:i:s'), 'UTC');
                    $interval = Carbon::parse($timeSlot['start_date_time'])->diffInDays(Carbon::parse($timeSlot['end_date_time']));

                    if ($interval > 0) {
                        $endAt->addDays($interval);
                    }

                    $this->persistVersionSlot($event, $timeSlot, $startAt, $endAt);
                }
            }

            return;
        }

        foreach ($request->eventDurationSlots as $timeSlot) {
            $startAt = Carbon::parse($timeSlot['start_date_time'], 'UTC');
            $endAt = Carbon::parse($timeSlot['end_date_time'], 'UTC');
            $this->persistVersionSlot($event, $timeSlot, $startAt, $endAt);
        }
    }

    private function persistVersionSlot(Event $event, array $timeSlot, Carbon $startAt, Carbon $endAt): void
    {
        $eventTimeSlot = new EventTimeSlot();
        $eventTimeSlot->event_fk_id = $event->id;
        $eventTimeSlot->meeting_room_id = rand(0, 9999) . substr(time(), -4) . Str::random(24);
        $eventTimeSlot->cost_type = $timeSlot['cost_type'] ? $timeSlot['cost_type'] : 'free';
        $eventTimeSlot->cost = $timeSlot['cost'] ?? 0;
        $eventTimeSlot->duration = $startAt->diffInMinutes($endAt) > 0 ? $startAt->diffInMinutes($endAt) : 60;
        $eventTimeSlot->total_seats = ! empty($timeSlot['total_seats']) && $timeSlot['total_seats'] <= 20 ? $timeSlot['total_seats'] : 20;
        $eventTimeSlot->start_date = $startAt->format('Y-m-d');
        $eventTimeSlot->end_date = $endAt->format('Y-m-d');
        $eventTimeSlot->start_time = $startAt->format('H:i:s');
        $eventTimeSlot->end_time = $endAt->format('H:i:s');
        $eventTimeSlot->start_date_time = $startAt->format('Y-m-d H:i:s');
        $eventTimeSlot->end_date_time = $endAt->format('Y-m-d H:i:s');
        $eventTimeSlot->status = "enabled";
        $eventTimeSlot->remember_token = Str::random(60);
        $eventTimeSlot->save();
    }

    private function storeUpdatedEventVersionFiles(Request $request, Event $event): void
    {
        if (count($request->eventFiles) <= 0) {
            return;
        }

        foreach ($request->eventFiles as $file) {
            $eventFile = new EventFile();
            $eventFile->event_fk_id = $event->id;
            $eventFile->file_manager_id = $file['file_manager_id'] ?? $file['id'] ?? null;
            $eventFile->file_title = $file['file_title'] ?? $file['name'] ?? '';
            $eventFile->file_description = $file['file_description'] ?? $file['eventFileDescription'] ?? '';
            $eventFile->file_cost = (int) ($file['file_cost'] ?? $file['eventFileCost'] ?? 0);
            $eventFile->size = $file['size'] ?? 0;
            $eventFile->remember_token = Str::random(60);
            $eventFile->save();
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // handle delete Event with checks conditions
    public function HandelEvent(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $timeSlot =  EventTimeSlot::where('event_fk_id', $request->eventId)->get();
        $eventPay = [];
        if (count($timeSlot) > 0) {
            foreach ($timeSlot as $slot) {
                $booking = EventBooking::where('event_slot_id', $slot->id)->first();
                if ($booking) {
                    $eventPay[] = $booking->id;
                } else {
                    $eventPay = [];
                }
            }
        }
        $event = Event::where('user_fk_id', $user->id)->where('id', $request->eventId)->first();
        if ($user) {
            if (count($eventPay) > 0 && $request->eventAction) {
                return response()->json(['status' => 'failed', 'messages' => 'Sorry you can,t do anything you  have booking in this events']);
            } else {
                if (count($eventPay) <= 0 && $event) {
                    if ($request->eventAction === 'disable') {
                        try {
                            Event::where('id', $request->eventId)->update([
                                'status' => 0
                            ]);
                            return response()->json(['status' => $this->status_code, 'messages' => 'event disable successfully']);
                        } catch (\PDOException $e) {

                            return response()->json(['status' => 'failed', 'messages' => 'Sorry Something Went Wrong']);
                        }
                    }
                }
            }
        }
    }

    // handle delete Event with checks conditions
    public function DisableSlotEvent(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $validator =  Validator::make($request->all(), [
            'EventId' => 'required',
            'SlotId' => 'required',
            'FollowingBy' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $event =  Event::where('id', $request->EventId)->where('user_fk_id', $user->id)->first();
        $Bookings =  EventBooking::where('event_fk_id', $request->EventId)->get();
        $BookingsSlot =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get();
        $eventPay = [];
        $event = Event::where('user_fk_id', $user->id)->where('id', $request->EventId)->first();
        //    if user profile not exist this event 
        if ($event) {
            // use UTC for now checks
            $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');

            if ($request->FollowingBy === 'UpcomingSlots') {

                if (count($BookingsSlot) <= 0 && $event) {
                    try {
                        $uf_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                        if (!empty($uf_slot)) {
                            $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('end_date_time', '>', $utcNow)->get();
                            $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where('end_date_time', '>', $utcNow)->get();
                            if (count($FollowingSlotsBookings) > 0) {
                                return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                            } else {
                                $DeleteSlotIds = [];
                                foreach ($EventSlots as $slotId) {
                                    if ($slotId) {
                                        $DeleteSlotIds[] = $slotId->id;
                                    } else {
                                        $DeleteSlotIds = [];
                                    }
                                }
                                $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->update([
                                    'status' => 'disabled'
                                ]);
                                return response()->json(['status' => $this->status_code, 'messages' => 'event disabled successfully', 'data' => $delete]);
                            }
                        } else {
                            return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                        }
                    } catch (\PDOException $e) {
                        return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry we are not found any action please take any action']);
                }
            } else if ($request->FollowingBy === 'FollowingSlots') {
                try {
                    $f_slot = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->first();
                    if (!empty($f_slot)) {
                        // normalize f_slot date/time to UTC for comparisons
                        $f_start_date_utc = Carbon::parse($f_slot->start_date, 'UTC')->format('Y-m-d');
                        $f_start_time_utc = Carbon::parse($f_slot->start_time, 'UTC')->format('H:i:s');
                        $f_end_time_utc = Carbon::parse($f_slot->end_time, 'UTC')->format('H:i:s');

                        $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)
                            ->where('start_date', '>=', $f_start_date_utc)
                            ->where('start_time', $f_start_time_utc)
                            ->where('end_time', $f_end_time_utc)
                            ->get();

                        $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)
                            ->where('start_date', '>=', $f_start_date_utc)
                            ->where('start_time', $f_start_time_utc)
                            ->where('end_time', $f_end_time_utc)
                            ->get();

                        if (count($FollowingSlotsBookings) > 0) {
                            return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                        } else {
                            $DeleteSlotIds = [];
                            foreach ($EventSlots as $slotId) {
                                if ($slotId) {
                                    $DeleteSlotIds[] = $slotId->id;
                                } else {
                                    $DeleteSlotIds = [];
                                }
                            }
                            $getStatusCountFollowing = EventTimeSlot::where('status', 'disabled')->where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->get()->unique('id')->pluck('id');

                            if (count($getStatusCountFollowing) > 0) {
                                $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $getStatusCountFollowing)->update([
                                    'status' => 'enabled'
                                ]);
                            } else {
                                $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->update([
                                    'status' => 'disabled'
                                ]);
                            }
                            return response()->json(['status' => $this->status_code, 'messages' => 'event ' . count($getStatusCountFollowing) > 0 ? 'enabled' : 'disabled' . ' successfully', 'data' => $delete]);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                    }
                } catch (\PDOException $e) {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                }
            } else if ($request->FollowingBy === 'ThisSlot') {
                try {
                    $fs_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                    if (!empty($fs_slot)) {
                        $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->get();
                        $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where('event_slot_id', $request->SlotId)->get();
                        if (count($FollowingSlotsBookings) > 0) {
                            return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                        } else {
                            $getStatusCount = EventTimeSlot::where('status', 'disabled')->where('event_fk_id', $request->EventId)->where('id', $fs_slot->id)->count();

                            $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $fs_slot->id)->update([
                                'status' => $getStatusCount > 0 ? 'enabled' : 'disabled'
                            ]);
                            return response()->json(['status' => $this->status_code, 'messages' => 'event ' . $getStatusCount > 0 ? 'enabled' : 'disabled' . ' successfully', 'data' => $delete]);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                    }
                } catch (\PDOException $e) {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                }
            } else if ($request->FollowingBy === 'ThisEvent') {
                try {
                    $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->get();
                    if (count($FollowingSlotsBookings) > 0) {
                        return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                    } else {
                        $getEventStatusCount = Event::where('status', 0)->where('id', $request->EventId)->count();

                        $delete =  Event::where('id', $request->EventId)->update([
                            'status' => $getEventStatusCount > 0 ? 1 : 0
                        ]);
                        return response()->json(['status' => $this->status_code, 'messages' => 'event ' . $getEventStatusCount > 0 ? 'enabled' : 'disabled' . 'successfully', 'data' => $delete]);
                    }
                } catch (\PDOException $e) {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong', 'exception' => $e]);
                }
            }
        } else {
            return response()->json(['status' => 'failed', 'messages' => 'this event is not exist in your profile']);
        }
    }

    // handle delete event and  slot with checks conditions
    public function DeleteEventByFollowing(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'EventId' => 'required',
            // 'SlotId' => 'required',
            'FollowingBy' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $event =  Event::where('id', $request->EventId)->where('user_fk_id', $user->id)->first();
        $Bookings =  EventBooking::where('event_fk_id', $request->EventId)->get();
        $BookingsSlot =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get();
        $eventPay = [];
        $event = Event::where('user_fk_id', $user->id)->where('id', $request->EventId)->first();
        //    if user profile not exist this event 
        if ($event) {
            // use UTC for now checks
            $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');

            if ($request->FollowingBy === 'UpcomingSlots') {

                if (count($BookingsSlot) <= 0 && $event) {
                    try {
                        $uf_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                        if (!empty($uf_slot)) {
                            // use UTC for now checks
                            $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('end_date_time', '>', $utcNow)->get();
                            $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where('status', 'enabled')->where('end_date_time', '>', $utcNow)->get();
                            if (count($FollowingSlotsBookings) > 0) {
                                return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                            } else {

                                $DeleteSlotIds = [];
                                foreach ($EventSlots as $slotId) {
                                    if ($slotId) {
                                        $DeleteSlotIds[] = $slotId->id;
                                    } else {
                                        $DeleteSlotIds = [];
                                    }
                                }
                                $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->delete();


                                return response()->json(['status' => $this->status_code, 'messages' => 'event slot delete successfully', 'data' => $delete]);
                            }
                        } else {
                            return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                        }
                    } catch (\PDOException $e) {
                        return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry we are not found any action please take any action']);
                }
            } else if ($request->FollowingBy === 'FollowingSlots') {
                try {
                    $f_slot = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->first();
                    if (!empty($f_slot)) {
                        // normalize f_slot date/time to UTC for comparisons
                        $f_start_date_utc = Carbon::parse($f_slot->start_date, 'UTC')->format('Y-m-d');
                        $f_start_time_utc = Carbon::parse($f_slot->start_time, 'UTC')->format('H:i:s');
                        $f_end_time_utc = Carbon::parse($f_slot->end_time, 'UTC')->format('H:i:s');

                        $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)
                            ->where('start_date', '>=', $f_start_date_utc)
                            ->where('start_time', $f_start_time_utc)
                            ->where('end_time', $f_end_time_utc)
                            ->get();

                        $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)
                            ->where('status', 'enabled')
                            ->where('start_date', '>=', $f_start_date_utc)
                            ->where('start_time', $f_start_time_utc)
                            ->where('end_time', $f_end_time_utc)
                            ->get();

                        // return $FollowingSlotsBookings;
                        if (count($FollowingSlotsBookings) > 0) {
                            return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                        } else {
                            $DeleteSlotIds = [];
                            foreach ($EventSlots as $slotId) {
                                if ($slotId) {
                                    $DeleteSlotIds[] = $slotId->id;
                                } else {
                                    $DeleteSlotIds = [];
                                }
                            }
                            $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->delete();
                            return response()->json(['status' => $this->status_code, 'messages' => 'event slot delete successfully', 'data' => $delete]);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                    }
                } catch (\PDOException $e) {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                }
            } else if ($request->FollowingBy === 'ThisSlot') {
                try {
                    $fs_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                    if (!empty($fs_slot)) {
                        $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->get();
                        $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where('status', 'enabled')->where('event_slot_id', $request->SlotId)->get();
                        if (count($FollowingSlotsBookings) > 0) {
                            return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                        } else {
                            $delete =  EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $fs_slot->id)->delete();
                            return response()->json(['status' => $this->status_code, 'messages' => 'event slot delete successfully', 'data' => $delete]);
                        }
                    } else {
                        return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                    }
                } catch (\PDOException $e) {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                }
            } else if ($request->FollowingBy === 'ThisEvent') {
                // return "return this";
                try {
                    $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->get();
                    $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where(function ($q) {
                        $q->where('status', 'enabled');
                    })->get();
                    $FollowingEventFiles =  EventFile::where('event_fk_id', $request->EventId)->pluck('file_manager_id');
                    if (count($FollowingSlotsBookings) > 0) {
                        return response()->json(['status' => 'failed', 'messages' => 'You have an active booking in one of your slots']);
                    } else {
                        DB::beginTransaction();
                        $deleteEvent =  Event::where('id', $request->EventId)->delete();
                        $deleteBooking =  EventBooking::where('event_fk_id', $request->EventId)->delete();
                        $deleteTimeSLot =  EventTimeSlot::where('event_fk_id', $request->EventId)->delete();
                        $deletePayment =  EventPayment::where('event_fk_id', $request->EventId)->delete();
                        $deleteFileManager = FileManager::whereIn('id', $FollowingEventFiles)->delete();
                        DB::commit();
                        return response()->json(['status' => $this->status_code, 'messages' => 'event delete successfully', 'data' => 1]);
                    }
                } catch (\PDOException $e) {
                    DB::rollBack();
                    return response()->json(['status' => 'failed', 'messages' => $e->getMessage()]);
                }
            }
        } else {
            return response()->json(['status' => 'failed', 'messages' => 'this event is not exist in your profile']);
        }
    }
    // handle cancel event and slot with checks conditions

    public function CancelEventByFollowing(Request $request)
    {
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));

        $validator =  Validator::make($request->all(), [
            'EventId' => 'required',
            'SlotId' => 'required',
            // 'FollowingBy' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $event =  Event::where('id', $request->EventId)->where('user_fk_id', $user->id)->first();
        $Bookings =  EventBooking::where('event_fk_id', $request->EventId)->get();
        $BookingsSlot =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get();
        $eventPay = [];
        $event = Event::where('user_fk_id', $user->id)->where('id', $request->EventId)->first();
        //    if user profile not exist this event 
        if ($event) {
            if ($request->FollowingBy === 'UpcomingSlots') {

                if (count($BookingsSlot) <= 0 && $event) {
                    try {
                        $uf_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                        if (!empty($uf_slot)) {
                            // use UTC for now checks
                            $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');
                            $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('end_date_time', '>', $utcNow)->get();
                            $FollowingSlotsBookings =  EventBooking::where('event_fk_id', $request->EventId)->where('end_date_time', '>', $utcNow)->get();
                            if (count($FollowingSlotsBookings) > 0) {
                                return response()->json(['status' => 'failed', 'messages' => 'You have active bookings in this event, cancel those bookings in order to disable event.']);
                            } else {
                                $DeleteSlotIds = [];
                                foreach ($EventSlots as $slotId) {
                                    if ($slotId) {
                                        $DeleteSlotIds[] = $slotId->id;
                                    } else {
                                        $DeleteSlotIds = [];
                                    }
                                }
                                $cancel =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->update([
                                    'status' => 'cancelled',
                                    'booked_seats' => 0,
                                ]);
                                // return "sd";
                                $userIds =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get()->pluck('p_user_id');

                                $details = [
                                    'body' => $event->event_title,
                                    'image' => json_decode($event->event_files, true)[0]['file_url'],
                                    'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId) . '" target="_blank">' . $event->event_title . '</a>',
                                    'description' => 'Your event was cancelled ',
                                    'greeting' => 'Hi ' . $user->name,
                                    'thanks' => 'Thank you for using ' . url('/') . '!',
                                    'actionText' => 'Cancelled Event',
                                    'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId),
                                    'order_id' => $event->id
                                ];
                                $users = User::where('id', $userIds)->get();
                                Notification::send($users, new HostToUserCancelEventEmail($details));
                                event(new UserNotification($user));
                                return response()->json(['status' => $this->status_code, 'messages' => 'cancel successfully', 'data' => $cancel]);
                            }
                        } else {
                            return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                        }
                    } catch (\PDOException $e) {
                        DB::rollBack();
                        return response()->json(['status' => 'failed', 'messages' => 'sorry something went wrong']);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'sorry we are not found any action please take any action']);
                }
            } else if ($request->FollowingBy === 'FollowingSlots') {
                $f_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                if (!empty($f_slot)) {
                    $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)
                        ->where('start_date', '>=', Carbon::parse($f_slot->start_date, 'UTC')->format('Y-m-d'))
                        ->where('start_time', Carbon::parse($f_slot->start_time, 'UTC')->format('H:i:s'))
                        ->where('end_time', Carbon::parse($f_slot->end_time, 'UTC')->format('H:i:s'))
                        ->get();
                    $DeleteSlotIds = [];
                    foreach ($EventSlots as $slotId) {
                        if ($slotId) {
                            $DeleteSlotIds[] = $slotId->id;
                        } else {
                            $DeleteSlotIds = [];
                        }
                    }
                    try {
                        DB::beginTransaction();
                        $cancel =  EventTimeSlot::where('event_fk_id', $request->EventId)->whereIn('id', $DeleteSlotIds)->update([
                            'status' => 'enabled',
                            'booked_seats' => 0,
                        ]);
                        $cancelHost =  EventBooking::where('event_fk_id', $request->EventId)->whereIn('event_slot_id', $DeleteSlotIds)->update([
                            'status' => 'cancelledByHost',
                        ]);
                        DB::commit();
                        $userIds =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get()->pluck('p_user_id');

                        $details = [
                            'body' => $event->event_title,
                            'image' => json_decode($event->event_files, true)[0]['file_url'],
                            'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId) . '" target="_blank">' . $event->event_title . '</a>',
                            'description' => 'Your event was cancelled ',
                            'greeting' => 'Hi ' . $user->name,
                            'thanks' => 'Thank you for using ' . url('/') . '!',
                            'actionText' => 'Cancelled Event',
                            'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId),
                            'order_id' => $event->id
                        ];
                        $users = User::where('id', $userIds)->get();
                        Notification::send($users, new HostToUserCancelEventEmail($details));
                        event(new UserNotification($user));
                        return response()->json(['status' => $this->status_code, 'messages' => 'cancel successfully', 'data' => $cancel]);
                    } catch (Exception $e) {
                        DB::rollBack();
                        return response()->json(['status' => 'failed', 'messages' => '!error', 'error' => $e]);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                }
            } else if ($request->FollowingBy === 'ThisSlot') {
                $fs_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                if (!empty($fs_slot)) {
                    $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->get();
                    try {
                        DB::beginTransaction();
                        $cancel =  EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $fs_slot->id)->update([
                            'status' => 'enabled',
                            'booked_seats' => 0,
                        ]);
                        $cancelHost =  EventBooking::where('event_fk_id', $request->EventId)->where('event_slot_id', $fs_slot->id)->update([
                            'status' => 'cancelledByHost',
                        ]);
                        DB::commit();
                        $userIds =  EventBooking::where('event_fk_id', $request->EventId)->where('event_fk_id', $request->SlotId)->get()->pluck('p_user_id');

                        $details = [
                            'body' => $event->event_title,
                            'image' => json_decode($event->event_files, true)[0]['file_url'],
                            'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId) . '" target="_blank">' . $event->event_title . '</a>',
                            'description' => 'Your event was cancelled ',
                            'greeting' => 'Hi ' . $user->name,
                            'thanks' => 'Thank you for using ' . url('/') . '!',
                            'actionText' => 'Cancelled Event',
                            'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId),
                            'order_id' => $event->id
                        ];
                        $users = User::where('id', $userIds)->get();
                        Notification::send($users, new HostToUserCancelEventEmail($details));
                        event(new UserNotification($user));
                        return response()->json(['status' => $this->status_code, 'messages' => 'cancel successfully', 'data' => $cancel]);
                    } catch (Exception $e) {
                        DB::rollBack();
                        return response()->json(['status' => 'failed', 'messages' => '!error', 'error' => $e]);
                    }
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                }
            } else {
                $fs_slot = EventTimeSlot::where('id', $request->SlotId)->first();
                if (!empty($fs_slot)) {
                    $EventSlots = EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $request->SlotId)->get();
                    DB::beginTransaction();
                    $cancel =  EventTimeSlot::where('event_fk_id', $request->EventId)->where('id', $fs_slot->id)->update([
                        'status' => 'enabled',
                        'booked_seats' => 0,
                    ]);
                    $cancelHost =  EventBooking::where('event_fk_id', $request->EventId)->where('event_slot_id', $fs_slot->id)->update([
                        'status' => 'cancelledByHost',
                    ]);
                    $HostBookings = EventBooking::where('h_user_id', $user->id)->where('event_slot_id', $request->SlotId)->get();
                    $eventPayments = EventPayment::where('to_user', $user->id)->where('event_time_slot_id', $request->SlotId)->get();

                    if (count($eventPayments) > 0) {
                        foreach ($eventPayments as $eventPayment) {
                            if (!empty($eventPayment->stripe_id)) {
                                if (!$eventPayment->amount_refunded) {
                                    $stripeRefund = $stripe->refunds->create([
                                        'payment_intent' => $eventPayment->stripe_id,
                                        'amount' => $eventPayment->amount * 100,
                                    ]);
                                    $eventPayment = EventPayment::where('event_time_slot_id', $eventPayment->event_time_slot_id)->update([
                                        'amount_refunded' => 1,
                                        'refunded_amount' => $eventPayment->amount,
                                        'refund_id' => $stripeRefund->id,
                                        'refunded_percentage' => 100
                                    ]);
                                }
                            }
                        }
                    }

                    DB::commit();
                    $userIds =  EventBooking::where('event_fk_id', $request->EventId)->where('event_slot_id', $request->SlotId)->get()->pluck('p_user_id');
                    // return $userIds;
                    $details = [
                        'body' => $event->event_title,
                        'image' => json_decode($event->event_files, true)[0]['file_url'],
                        'title' => '<a href="' . url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId) . '" target="_blank">' . $event->event_title . '</a>',
                        'description' => 'Your event was cancelled ',
                        'greeting' => 'Hi ' . $user->name,
                        'thanks' => 'Thank you for using ' . url('/') . '!',
                        'actionText' => 'Cancelled Event',
                        'actionURL' => url('/event?token=' . $event->remember_token . '&event=' . $event->id . '&slot=' . $request->SlotId),
                        'order_id' => $event->id
                    ];
                    $users = User::whereIn('id', $userIds)->get();
                    if ($users->count() > 0) {
                        Notification::send($users, new HostToUserCancelEventEmail($details));
                        event(new UserNotification($user));
                    }
                    return response()->json(['status' => $this->status_code, 'messages' => 'cancel successfully', 'data' => $cancel]);
                    DB::rollBack();
                } else {
                    return response()->json(['status' => 'failed', 'messages' => 'this slot is not exist']);
                }
            }
        } else {
            return response()->json(['status' => 'failed', 'messages' => 'this event is not exist in your profile']);
        }
    }

    // single Event by id 
    public function eventByIdFilter($event, $user)
    {
        $eventImages = json_decode($event->event_files);
        $eventTags = json_decode($event->event_tags);

        $eventImagesArray = [];
        if (count($eventImages) > 0) {

            foreach ($eventImages as $eventFile) {
                $eventImagesArray[] = [
                    'id' => $eventFile->id,
                    //   'userId'=>$eventFile->user_id,
                    'size' => $eventFile->size,
                    'name' => $eventFile->name,
                    'fileUrl' => $eventFile->file_url,
                    'filePath' => $eventFile->file_path,
                    'type' => $eventFile->type,
                    //   'createAt'=>$eventFile->created_at,
                ];
            }
        }

        $eventUser = [
            'id' => $event->EventCreateUser['id'],
            'name' => $event->EventCreateUser['name'],
            'userName' => $event->EventCreateUser['username'],
            'joinedOn' => $event->EventCreateUser['joined_on'],
            'lastActive' => $event->EventCreateUser['last_active'],
            'profilePicture' => $event->EventCreateUser['UserProfile']
        ];
        if ($event->EventDiscount) {
            $eventDiscount = [
                'id' => $event->EventDiscount['id'],
                'eventId' => $event->EventDiscount['event_fk_id'],
                'people' => $event->EventDiscount['people'],
                'offer' => $event->EventDiscount['offer'],
                'rememberToken' => $event->EventDiscount['remember_token'],
                'createdAt' => $event->EventDiscount['created_at'],
                'updatedAt' => $event->EventDiscount['updated_at'],
            ];
        } else {
            $eventDiscount = $event->EventDiscount;
        }

        if (count($event->EventActivity) > 0) {
            $eventActivity = [
                'id' => $event->EventActivity['id'],
                'userId' => $event->EventActivity['user_fk_id'],
                'eventId' => $event->EventActivity['event_fk_id'],
                'eventStatus' => $event->EventActivity['event_status'],
                'rememberToken' => $event->EventActivity['remember_token'],
                'createdAt' => $event->EventActivity['created_at'],
                'updatedAt' => $event->EventActivity['updated_at'],
            ];
        } else {
            $eventActivity = $event->EventActivity;
        }
        if ($user) {
            $eventFilePayment = EventFilePayment::where('event_fk_id', $event->id)->where(function ($q) use ($user) {
                $q->where('user_fk_id', $user->id)->orWhere('to_user_id', $user->id);
            })->get();
        } else {
            $eventFilePayment = [];
        }

        if (count($eventFilePayment) > 0) {
            $eventFilePayment = $eventFilePayment;
            // foreach ($event->EventFilePayment as $FilePayment) {
            //     $eventFilePayment[] = [
            //         'id' => $FilePayment->id,
            //         'userId' => $FilePayment->user_fk_id,
            //         'toUserId' => $FilePayment->to_user_id,
            //         'eventId' => $FilePayment->event_fk_id,
            //         'eventFileId' => $FilePayment->event_file_fk_id,
            //         'stripeId' => $FilePayment->stripe_id,
            //         'paid' => $FilePayment->paid,
            //         'status' => $FilePayment->status,
            //         'rememberToken' => $FilePayment->remember_token,
            //         'createdAt' => $FilePayment->created_at,
            //         'updatedAt' => $FilePayment->updated_at,
            //     ];
            // }
        } else {
            $eventFilePayment = [];
        }

        if ($event->FavoriteEvents) {
            $favoriteEvents = null;
            $favoriteEvents = [
                'id' => $event->FavoriteEvents->id,
                'userId' => $event->FavoriteEvents->user_id,
                'eventId' => $event->FavoriteEvents->event_id,
                'toUser' => $event->FavoriteEvents->toUser,
                'rememberToken' => $event->FavoriteEvents->remember_token,
                'createdAt' => $event->FavoriteEvents->created_at,
                'updatedAt' => $event->FavoriteEvents->updated_at,
            ];
        } else {
            $favoriteEvents = null;
        }
        if (count($event->EventReview) > 0) {
            $eventReviews = $event['EventReviews'];
        } else {
            $eventReviews = [];
        }
        if (count($event->EventReview) > 0) {
            $eventAverage = $event->EventReview->where('rating', '>', 0)->avg('rating');
        } else {
            $eventAverage = 0;
        }
        if (count($event->EventReview) > 0) {
            $totalReviews = $event->EventReview->where('rating', '>', 0)->count();
        } else {
            $totalReviews = 0;
        }
        if ($event->EventCreateUser->EventReviews) {
            $userAverage = $event->EventCreateUser->EventReviews;
        } else {
            $userAverage = null;
        }

        // if (count($event->EventTimeSlot) > 0) {
        //     $eventTimeSlot = [];
        //     foreach ($event->EventTimeSlot as $timeSlot) {
        //         $eventTimeSlot[] = [
        //             'id' => $timeSlot->id,
        //             'eventId' => $timeSlot->event_fk_id,
        //             'meetingRoomId' => $timeSlot->meeting_room_id,
        //             'meetingRoomStartTime' => $timeSlot->meeting_room_start_time,
        //             'meetingRoomEndTime' => $timeSlot->meeting_room_end_time,
        //             'startTime' => $timeSlot->start_time,
        //             'endTime' => $timeSlot->end_time,
        //             'startDate' => $timeSlot->start_date,
        //             'endDate' => $timeSlot->end_date,
        //             'bookedSeats' => $timeSlot->booked_seats,
        //             'status' => $timeSlot->status,
        //             'rememberToken' => $timeSlot->remember_token,
        //             'createdAt' => $timeSlot->created_at,
        //             'updatedAt' => $timeSlot->updated_at,
        //         ];
        //     }
        // } else {
        $eventTimeSlot = [];
        // }


        if (count($event->EventPayment) > 0) {
            $eventPayment = [];
            foreach ($event->EventPayment as $EventPayment) {
                $eventPayment[] = [
                    'id' => $EventPayment->id,
                    'userId' => $EventPayment->user_fk_id,
                    'eventTimeSlotId' => $EventPayment->event_time_slot_id,
                    'eventId' => $EventPayment->event_fk_id,
                    'paymentDateTime' => $EventPayment->event_date_time,
                    'amount' => $EventPayment->amount,
                    'stripeId' => $EventPayment->stripe_id,
                    'transactionId' => $EventPayment->transaction_id,
                    'acceptByHost' => $EventPayment->accept_by_host,
                    'paid' => $EventPayment->paid,
                    'status' => $EventPayment->status,
                    'description' => $EventPayment->description,
                    'createdAt' => $EventPayment->created_at,
                    'updatedAt' => $EventPayment->updated_at,
                ];
            }
        } else {
            $eventPayment = $event->EventPayment;
        }
        if (count($event->EventBooking) > 0) {
            $EventBooking = [];
            foreach ($event->EventBooking as $timeSlot) {
                $EventBooking[] = [
                    'id' => $timeSlot->id,
                    'eventId' => $timeSlot->event_fk_id,
                    'eventSlotId' => $timeSlot->event_slot_id,
                    'hUserId' => $timeSlot->h_user_id,
                    'pUserId' => $timeSlot->p_user_id,
                    'meetingRoomId' => $timeSlot->meeting_room_id,
                    'meetingRoomStartTime' => $timeSlot->meeting_room_start_time,
                    'meetingRoomEndTime' => $timeSlot->meeting_room_end_time,
                    'startTime' => $timeSlot->start_time,
                    'endTime' => $timeSlot->end_time,
                    'startDate' => $timeSlot->start_date,
                    'endDate' => $timeSlot->end_date,
                    'bookedSeats' => $timeSlot->booked_seats,
                    'status' => $timeSlot->status,
                    'rememberToken' => $timeSlot->remember_token,
                    'createdAt' => $timeSlot->created_at,
                    'updatedAt' => $timeSlot->updated_at,
                ];
            }
        } else {
            $EventBooking = $event->EventBooking;
        }
        $eventFiles = [];

        if (count($event->EventFile) > 0) {
            foreach ($event->EventFile as $eventFileIndex) {
                $eventFiles[] = [
                    'id' => $eventFileIndex->id,
                    'eventId' => $eventFileIndex->event_fk_id,
                    'fileManagerId' => $eventFileIndex->file_manager_id,
                    'fileManager' => FileManager::where('id', $eventFileIndex->file_manager_id)->select('id', 'user_id', 'name')->first(),
                    'host' => $user ? FileManager::where('id', $eventFileIndex->file_manager_id)->where('user_id', $user->id)->count() : 0,
                    'fileTitle' => $eventFileIndex->file_title,
                    'fileDescription' => $eventFileIndex->file_description,
                    'fileCost' => $eventFileIndex->file_cost,
                    'size' => $eventFileIndex->size,
                    'rememberToken' => $eventFileIndex->remember_token,
                    'createdAt' => $eventFileIndex->created_at,
                    'updatedAt' => $eventFileIndex->updated_at,
                ];
            }
        } else {
            $eventFiles = [];
        }
        $favoriteCounts = 0;
        if (count($event->FavoriteCount) > 0) {
            $favoriteCounts = $event->FavoriteCount->count();
        } else {
            $favoriteCounts = 0;
        }
        $event = [
            'id' => $event->id,
            'eventTitle' => $event->event_title,
            'userId' => $event->user_fk_id,
            'eventImages' => $eventImagesArray,
            'eventFiles' => $eventFiles,
            'eventType' => $event->event_type,
            'cost' => $event->cost,
            'autoAcceptParticipant' => $event->auto_accept_participant,
            'status' => $event->status,
            'eventCreateAt' => $event->date_of_create,
            'timezone' => $event->timezone,
            'duration' => $event->duration,
            'eventSubscriptionType' => $event->eventSubscriptionType,
            'rememberToken' => $event->remember_token,
            'createdAt' => $event->created_at,
            'updatedAt' => $event->updated_at,
            'eventDescription' => $event->event_description,
            'eventTags' => $eventTags,
            'eventVisible' => $event->event_visible,
            'eventSubCategory' => $event->EventsChildCategory,
            'eventCategory' => $event->EventsParentCategory,
            'eventInvitedPeople' => $event->event_invited_people,
            'numberOfSeats' => $event->number_of_seats,
            'eventInvitedByEmail' => $event->event_invited_by_email,
            'eventInvitedByEmail' => $event->event_invited_by_email,
            'eventCreatedUser' => $eventUser,
            // 'eventTimeSlot' => $eventTimeSlot,
            'eventDiscount' => $eventDiscount,
            'eventActivity' => $eventActivity,
            'eventFilePayment' => $eventFilePayment,
            'eventPayment' => $eventPayment,
            'eventBooking' => $EventBooking,
            'favoriteEvents' => $favoriteEvents,
            'favoriteCount' => $favoriteCounts,
            'totalReviews' => $totalReviews,
            'reviewAverage' => $eventAverage,
            'userAverage' => $userAverage,
            'eventReview' => $eventReviews,
        ];
        return $event;
    }
    public function eventById($id, $token)
    {

        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
            if ($id) {
                try {
                    $event = Event::where('id', $id)->where('remember_token', $token)->with(['EventFile', 'EventPayment', 'EventDiscount', 'EventActivity', 'EventFilePayment' => function ($q) use ($user) {
                        $q->where('user_fk_id', $user->id)->orWhere('to_user_id', $user->id);
                    }, 'EventsParentCategory', 'EventsChildCategory', 'EventCreateUser' => function ($q) {
                        $q->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }, 'EventReviews' => function ($q) {
                            $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating, COUNT(event_reviews.rating) AS average_count')
                                ->groupBy('host_id');
                        }]);
                    }, 'EventReviews' => function ($q) {
                        $q->with(['Sender' => function ($q) {
                            $q->with(['UserProfile' => function ($q) {
                                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                            }]);
                        }, 'Receiver' => function ($q) {
                            $q->with(['UserProfile' => function ($q) {
                                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                            }]);
                        }])->where('receiver_id', '>', 0);
                    }, 'FavoriteEvents' => function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    }, 'FavoriteCount', 'EventBooking'])->first();
                    if ($event) {
                        $event = $this->eventByIdFilter($event, $user);
                    } else {
                        return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this event']);
                    }
                    event(new UserActivity(request()->ip()));

                    return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                } catch (\Throwable $th) {

                    return response()->json($th);
                }
            }
        } else {
            if ($id) {
                $user = auth()->user();

                try {
                    $event = Event::where('id', $id)->where('remember_token', $token)->with(['EventTimeSlot', 'EventFile', 'EventPayment', 'EventDiscount', 'EventActivity', 'EventFilePayment' => function ($q) use ($user) {
                        $q->where('user_fk_id', 0)->orWhere('to_user_id', 0);
                    }, 'EventCreateUser' => function ($q) {
                        $q->with(['UserProfile' => function ($q) {
                            $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                        }, 'EventReviews' => function ($q) {
                            $q->selectRaw('host_id,AVG(event_reviews.rating) AS average_rating, COUNT(event_reviews.rating) AS average_count')
                                ->groupBy('host_id');
                        }]);
                    }, 'EventReviews' => function ($q) {
                        $q->with(['Sender' => function ($q) {
                            $q->with(['UserProfile' => function ($q) {
                                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                            }]);
                        }, 'Receiver' => function ($q) {
                            $q->with(['UserProfile' => function ($q) {
                                $q->select('id', 'user_fk_id', 'profile_picture', 'social_profile_picture_url');
                            }]);
                        }]);
                    }, 'FavoriteEvents', 'FavoriteCount', 'EventBooking'])->first();
                    if ($event) {
                        $event = $this->eventByIdFilter($event, $user);
                    } else {
                        return response()->json(["status" => "failed", "success" => false, "message" => 'we are not found this event']);
                    }
                    event(new UserActivity(request()->ip()));

                    return response()->json(["status" => $this->status_code, "message" => "Event Details Fetch Successfully ", "data" => $event]);
                } catch (\Throwable $th) {

                    return response()->json($th);
                }
            }
        }
    }

    // event File By Event ID 

    public function eventFiles(Request $request)
    {
        event(new UserActivity(request()->ip()));

        $eventFile = Event::where('id', $request->eventId)->with('EventFile')->get();
        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $eventFile]);
    }

    //**** Upcoming  event Time Slot

    public function eventTimeSlot(Request $request)
    {
        event(new UserActivity(request()->ip()));

        // use UTC for all comparisons
        $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');

        // resolve authenticated user id if available (api guard preferred)
        $userId = null;
        if (Auth::guard('api')->check()) {
            $userId = Auth::guard('api')->id();
        } elseif (Auth::check()) {
            $userId = Auth::id();
        } else {
            $userId = 0;
        }

        if ($request->slotId) {
            $eventActivity = EventTimeSlot::where('event_fk_id', $request->eventId)
                ->with([
                    'Events',
                    'EventBooking' => function ($q) use ($userId) {
                        $q->where('p_user_id', $userId)->where('status', 'enabled');
                    },
                    'EventPayment'
                ])
                ->where('id', $request->slotId)
                ->first();
        } else {
            $eventActivity = EventTimeSlot::with([
                'Events',
                'EventBooking' => function ($q) {
                    $q->where('status', 'enabled');
                },
                'EventPayment'
            ])
                ->where('event_fk_id', $request->eventId)
                ->where('start_date_time', '>=', $utcNow)
                ->orderBy('start_date_time')
                ->first();
        }

        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $eventActivity]);
    }

    // event Discount

    public function eventDiscount(Request $request)
    {
        event(new UserActivity(request()->ip()));

        $eventDiscount = Event::where('id', $request->eventId)->with('EventDiscount')->get();
        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $eventDiscount]);
    }

    // event Activity
    public function eventActivity(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $eventActivity = Event::where('id', $request->eventId)->with('EventActivity')->get();
        return response()->json(["status" => $this->status_code, "message" => "Data Fetch Successfully ", 'data' => $eventActivity]);
    }
    // event Activity
    public function detailsSlots(Request $request)
    {
        event(new UserActivity(request()->ip()));

        // use UTC for all comparisons
        $utcNow = Carbon::now('UTC')->format('Y-m-d H:i:s');
        $timezone = $request->tz ?: 'UTC';
        // return $request->all();
        if ($request->startDate) {
            $startOfDayUtc = Carbon::parse($request->startDate, $timezone)->startOfDay()->setTimezone('UTC')->format('Y-m-d H:i:s');
            $endOfDayUtc = Carbon::parse($request->startDate, $timezone)->endOfDay()->setTimezone('UTC')->format('Y-m-d H:i:s');
            $eventActivity = EventTimeSlot::where('status', 'enabled')
                ->where('start_date_time', '>=', $utcNow)
                ->where('event_fk_id', $request->eventId)
                ->whereBetween('start_date_time', [$startOfDayUtc, $endOfDayUtc])
                ->orderBy('start_date_time')
                ->get();
        } elseif ($request->slotId) {
            $eventActivity = EventTimeSlot::where('status', 'enabled')
                ->where('start_date_time', '>=', $utcNow)
                ->where('event_fk_id', $request->eventId)
                ->get();
        } else if ($request->activeStart && $request->activeEnd) {
            $activeStartUtc = Carbon::parse($request->activeStart, $timezone)->startOfDay()->setTimezone('UTC')->format('Y-m-d H:i:s');
            $activeEndUtc = Carbon::parse($request->activeEnd, $timezone)->endOfDay()->setTimezone('UTC')->format('Y-m-d H:i:s');

            $eventActivity = Event::join('event_time_slots', 'events.id', '=', 'event_time_slots.event_fk_id')
                ->where('event_time_slots.start_date_time', '>=', $utcNow)
                ->where('events.id', $request->eventId)
                ->whereBetween('event_time_slots.start_date_time', [$activeStartUtc, $activeEndUtc])
                ->selectRaw('MIN(event_time_slots.start_date_time) as start_date_time, event_time_slots.start_date')
                ->groupBy('event_time_slots.start_date')
                ->get();
        } else {
            $eventActivity = EventTimeSlot::where('status', 'enabled')
                ->where('start_date_time', '>=', $utcNow)
                ->where('event_fk_id', $request->eventId)
                ->orderBy('start_date_time')
                ->get();
        }

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "Data Fetch Successfully ",
            'data' => $eventActivity
        ]);
    }
    public function MyUpComingEvents(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        $eventBookingData =  EventBooking::with(['Events'])->where('start_date_time', '>=', Carbon::now('UTC')->format('Y-m-d H:i:s'))->where('status', 'enabled')
            ->where(function ($q) use ($user) {
                $q->where('h_user_id', $user->id)->orWhere('p_user_id', $user->id);
            })->limit(4)->get();
        return response()->json(['status' => $this->status_code, 'message' => 'Events fetch Successfully', 'data' => $eventBookingData]);

        // $events = Event::orderBy('id', 'desc')->where('user_fk_id', $user->id)->with(['EventTimeSlot', 'EventFile', 'EventDiscount', 'EventActivity', 'EventFilePayment', 'EventCreateUser', 'FavoriteEvents'])->limit(2)->get();
        // $event = [];
        // $BookedEvents = [];
        // $SlotIds = [];
        // $EventIds = [];
        // $payments = EventPayment::where('user_fk_id', $user->id)->get();
        // foreach ($payments as $eventId) {
        //     $SlotIds[] = $eventId->event_time_slot_id;
        //     $EventIds[] = $eventId->event_fk_id;
        // }
        // $eventsBooked = Event::whereIn('id', $EventIds)->with(['EventTimeSlot' => function ($q) use ($SlotIds) {
        //     $q->whereIn('event_time_slots.id', $SlotIds);
        // }])->limit(2)->get();

        // // foreach ($eventsBooked as $BookEvent) {
        // //     foreach ($BookEvent->EventBooking->where('start_date_time','>=',Carbon::parse(Carbon::now()->timezone($request->tz)->toDateTimeString())->format('Y-m-d H:i:s'))->where('status','enabled')  as $bookSlot) {
        // //         $BookedEvents[] = [
        // //             'id' => $BookEvent->id,
        // //             'eventTitle' => $BookEvent->event_title,
        // //             'rememberToken' => $BookEvent->remember_token,
        // //             'eventFiles' => $BookEvent->event_files,
        // //             'userId' => $BookEvent->user_fk_id,
        // //             'eventType' => $BookEvent->event_type,
        // //             'slotId' => $bookSlot->id,
        // //             'eventId' => $bookSlot->event_fk_id,
        // //             'startDate' => $bookSlot->start_date,
        // //             'endDate' => $bookSlot->end_date,
        // //             'startTime' => $bookSlot->start_time,
        // //             'startDateTime' => $bookSlot->start_date_time,
        // //             'endTime' => $bookSlot->end_time,
        // //             'bookedSeats' => $bookSlot->booked_seats,
        // //         ];
        // //     }
        // // }
        // // foreach ($events as $eventIndex) {

        // //     foreach ($eventIndex->EventBooking->where('start_date_time','>=',Carbon::parse(Carbon::now()->timezone($request->tz)->toDateTimeString())->format('Y-m-d H:i:s'))->where('status','enabled')->unique('id') as $slot) {
        // //         $event[] = [
        // //             'id' => $eventIndex->id,
        // //             'eventTitle' => $eventIndex->event_title,
        // //             'rememberToken' => $eventIndex->remember_token,
        // //             'eventFiles' => $eventIndex->event_files,
        // //             'userId' => $eventIndex->user_fk_id,
        // //             'eventType' => $eventIndex->event_type,
        // //             'slotId' => $slot->id,
        // //             'eventId' => $slot->event_fk_id,
        // //             'startDate' => $slot->start_date,
        // //             'endDate' => $slot->end_date,
        // //             'startDateTime' => $slot->start_date_time,
        // //             'startTime' => $slot->start_time,
        // //             'endTime' => $slot->end_time,
        // //             'bookedSeats' => $slot->booked_seats,
        // //         ];
        // //     }
        // // }
        // // $dataEVENT=array_merge($event,$BookedEvents);
        // // return response()->json(['status' => $this->status_code, 'message' => 'Events fetch Successfully', 'data' => $dataEVENT]);
    }
    // Delete event By Id
    public function destroy(Request $request)
    {

        $infoEventFiles = Event::where('id', $request->id)->first()->event_files;
        $eventFiles = EventFile::where('event_fk_id', $request->id)->get();
        foreach ($eventFiles as $File) {
            $EventFilePath = storage_path() . '/EventsFiles/' . $File->files;
            if (File::exists($EventFilePath)) {
                File::delete($EventFilePath);
            }
        }
        $infoFile = explode(',', $infoEventFiles);
        for ($i = 0; $i < count($infoFile); $i++) {
            $InfoFilePath = storage_path() . '/EventsFiles/InfoFile/' . $infoFile[$i];
            if (File::exists($InfoFilePath)) {
                File::delete($InfoFilePath);
            }
        }
        event(new UserActivity(request()->ip()));
        Event::find($request->id)->delete();
        return "Event Deleted Successfully";
    }
    public function deleteEventSlot(Request $Request)
    {
        $user = auth()->user();
        return [$Request->name, $user];
    }
    public function EventFileDownload(Request $request)
    {
        try {
            event(new UserActivity(request()->ip()));
            $eventFile = EventFile::where('id', $request->fileId)->first();
            $EventFilePath = storage_path() . "/EventsFiles/" . $eventFile->files;
            return Response::download($EventFilePath, $eventFile->files);
        } catch (ModelNotFoundException $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
    }
    // edit event time Conflicts
    public function EditEventTimeConflictsChecks(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        if ($user) {
            $clientTimezone = $this->resolveClientTimezone($request);
            if ($request->eventRepeatBy != "") {

                if ($request->FollowingBy === "FollowingSlots") {
                    // return $request->tz;
                    try {
                        $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                        $eventPaymentIds =  EventBooking::where('status', 'enabled')->where(function ($q) use ($user) {
                            $q->where('h_user_id', $user->id)->orWhere('p_user_id', $user->id);
                        })->select('id', 'event_fk_id', 'h_user_id', 'event_slot_id')->get();
                        // return $eventPaymentIds;
                        $EventSlotsMatch = [];
                        $eventRowSlotIds = [];
                        foreach ($eventPaymentIds as $eventPaymentId) {
                            $eventRowSlotIds[] = $eventPaymentId->event_slot_id;
                        }
                        if (count($request->startDateTime) == count($request->endDateTime) && count($request->eventDurationSlots) > 0) {

                            foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                                $eventDurationSlot['Interval'] = Carbon::parse($eventDurationSlot['start_date_time'])->diffInDays(Carbon::parse($eventDurationSlot['end_date_time']));
                                foreach ($request->startDateTime as $index => $startDateTime) {
                                    [$rangeStartUtc, $rangeEndUtc] = $this->buildRepeatedConflictRangeUtc(
                                        $startDateTime,
                                        $request->endDateTime[$index],
                                        [
                                            'startDateTime' => $eventDurationSlot['start_date_time'],
                                            'endDateTime' => $eventDurationSlot['end_date_time'],
                                            'interval' => $eventDurationSlot['Interval'],
                                        ],
                                        $clientTimezone
                                    );

                                    if (count($eventRowSlotIds) > 0) {
                                        // return $eventRowSlotIds;
                                        $EventSlotsMatches = EventBooking::where('status', 'enabled')->where('start_date_time', '>=', Carbon::now('UTC')->format('Y-m-d H:i:s'))->with(['Events' => function ($q) {
                                            $q->select('id', 'event_title', 'user_fk_id');
                                        }])
                                            ->whereIn('event_slot_id', $eventRowSlotIds)
                                            ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                                $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                            })
                                            // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                            ->first();
                                    }
                                    if (!empty($EventSlotsMatches)) {
                                        $EventSlotsMatch[] = $EventSlotsMatches->start_date_time;
                                    }
                                }
                            }
                        }
                        // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                        if (count($EventSlotsMatch) > 0) {
                            return response()->json(['status' => 'events', 'message' => 'Time Conflict success', 'data' => $EventSlotsMatch]);
                        }

                        return response()->json(['status' => 200, 'message' => 'Time Conflict', 'events' => []]);
                    } catch (ModelNotFoundException $exception) {
                        return back()->withError($exception->getMessage())->withInput();
                    }
                } else if ($request->FollowingBy === "ThisSlot") {
                    // return "sdasd";
                    try {
                        $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                        $eventPaymentIds =  EventPayment::where('user_fk_id', $user->id)->select('id', 'event_fk_id', 'user_fk_id', 'event_time_slot_id')->get();
                        $eventRowIds = [];
                        $EventSlotsMatch = [];
                        $eventRowSlotIds = [];
                        foreach ($eventIds as $eventId) {
                            $eventRowIds[] = $eventId->id;
                        }
                        foreach ($eventPaymentIds as $eventPaymentId) {
                            $eventRowSlotIds[] = $eventPaymentId->event_time_slot_id;
                        }
                        if (count($request->startDateTime) == count($request->endDateTime) && count($request->eventDurationSlots) > 0) {
                            foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                                $eventDurationSlot['Interval'] = Carbon::parse($eventDurationSlot['start_date_time'])->diffInDays(Carbon::parse($eventDurationSlot['end_date_time']));

                                foreach ($request->startDateTime as $index => $startDateTime) {
                                    [$rangeStartUtc, $rangeEndUtc] = $this->buildRepeatedConflictRangeUtc(
                                        $startDateTime,
                                        $request->endDateTime[$index],
                                        [
                                            'startDateTime' => $eventDurationSlot['start_date_time'],
                                            'endDateTime' => $eventDurationSlot['end_date_time'],
                                            'interval' => $eventDurationSlot['Interval'],
                                        ],
                                        $clientTimezone
                                    );
                                    if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                        $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                            $q->select('id', 'event_title', 'user_fk_id');
                                        }])
                                            ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                                $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                            })
                                            ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                                $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                            })
                                            // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                            ->first();
                                        $EventSlotsMatches = EventBooking::with(['Events' => function ($q) {
                                            $q->select('id', 'event_title', 'user_fk_id');
                                        }])
                                            ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                                $q->orWhereIn('event_slot_id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                            })
                                            ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                                $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                            })
                                            // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                            ->first();
                                    } else {
                                        $EventSlotsMatches = EventTimeSlot::whereIn('event_fk_id', $eventRowIds)
                                            ->with(['Events' => function ($q) {
                                                $q->select('id', 'event_title', 'user_fk_id');
                                            }])
                                            ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                                $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                            })
                                            // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                            ->first();
                                        $EventSlotsMatches = EventBooking::whereIn('event_fk_id', $eventRowIds)
                                            ->with(['Events' => function ($q) {
                                                $q->select('id', 'event_title', 'user_fk_id');
                                            }])
                                            ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                                $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                            })
                                            // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                            ->first();
                                    }

                                    if (!empty($EventSlotsMatches)) {
                                        $EventSlotsMatch[] = $EventSlotsMatches;
                                    }
                                }
                            }
                        }
                        // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                        if (count($EventSlotsMatch) > 0) {
                            return response()->json(['status' => 'events', 'message' => 'Time Conflict success', 'data' => $EventSlotsMatch]);
                        }

                        return response()->json(['status' => 200, 'message' => 'Time Conflict', 'events' => []]);
                    } catch (ModelNotFoundException $exception) {
                        return back()->withError($exception->getMessage())->withInput();
                    }
                }
            } else if ($request->eventRepeatBy == '' && count($request->startDateTime) == 1) {
                try {
                    $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                    $eventPaymentIds =  EventPayment::where('user_fk_id', $user->id)->select('id', 'user_fk_id', 'event_fk_id', 'event_time_slot_id')->get();
                    $eventRowIds = [];
                    $EventSlotsMatch = [];
                    $eventRowSlotIds = [];
                    foreach ($eventIds as $eventId) {
                        $eventRowIds[] = $eventId->id;
                    }
                    foreach ($eventPaymentIds as $eventPaymentId) {
                        $eventRowSlotIds[] = $eventPaymentId->event_time_slot_id;
                    }
                    if (count($request->eventDurationSlots) > 0) {
                        foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                            [$rangeStartUtc, $rangeEndUtc] = $this->buildSingleConflictRangeUtc(
                                [
                                    'startDateTime' => $eventDurationSlot['start_date_time'],
                                    'endDateTime' => $eventDurationSlot['end_date_time'],
                                ],
                                $clientTimezone
                            );
                            if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                        $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->first();
                                $EventSlotsMatches = EventBooking::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                        $q->orWhereIn('event_slot_id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->first();
                            } else {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->whereIn('event_fk_id', $eventRowIds)
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->first();
                                $EventSlotsMatches = EventBooking::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->whereIn('event_fk_id', $eventRowIds)
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->first();
                            }
                            if (!empty($EventSlotsMatches)) {
                                $EventSlotsMatch[] = $EventSlotsMatches;
                            }
                        }
                    }
                    // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                    if (count($EventSlotsMatch) > 0) {
                        return response()->json(['status' => 'events', 'message' => 'Time Conflict', 'data' => $EventSlotsMatch]);
                    }
                    return response()->json(['status' => 200, 'message' => 'Time Conflict', 'data' => []]);
                } catch (ModelNotFoundException $exception) {
                    return back()->withError($exception->getMessage())->withInput();
                }
            } else {
                return response()->json(["status" => "failed", "errors" => [], 'message' => '!Oops you missed something']);
            }
        } else {
            return response()->json(["status" => "failed", "errors" => [], 'message' => 'Please login first']);
        }
    }

    // create event time conflicts 
    public function TimeConflictsChecks(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        if ($user) {
            $clientTimezone = $this->resolveClientTimezone($request);
            if ($request->eventRepeatBy != "") {
                try {
                    $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                    $eventPaymentIds =  EventPayment::where('user_fk_id', $user->id)->select('id', 'event_fk_id', 'user_fk_id', 'event_time_slot_id')->get();
                    $eventRowIds = [];
                    $EventSlotsMatch = [];
                    $eventRowSlotIds = [];
                    foreach ($eventIds as $eventId) {
                        $eventRowIds[] = $eventId->id;
                    }
                    foreach ($eventPaymentIds as $eventPaymentId) {
                        $eventRowSlotIds[] = $eventPaymentId->event_time_slot_id;
                    }
                    if (count($request->startDateTime) == count($request->endDateTime) && count($request->eventDurationSlots) > 0) {
                        foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                            foreach ($request->startDateTime as $index => $startDateTime) {
                                [$rangeStartUtc, $rangeEndUtc] = $this->buildRepeatedConflictRangeUtc(
                                    $startDateTime,
                                    $request->endDateTime[$index],
                                    $eventDurationSlot,
                                    $clientTimezone
                                );

                                if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                    $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                        $q->select('id', 'event_title', 'user_fk_id');
                                    }])
                                        ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                            $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                        })
                                        ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                            $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                        })
                                        // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                        ->first();
                                } else {
                                    $EventSlotsMatches = EventTimeSlot::whereIn('event_fk_id', $eventRowIds)
                                        ->with(['Events' => function ($q) {
                                            $q->select('id', 'event_title', 'user_fk_id');
                                        }])
                                        ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                            $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                        })
                                        // ->whereRaw("start_date_time BETWEEN '" .  . "' AND  '" .  . "' OR end_date_time BETWEEN '" . Carbon::parse($startDateTime)->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s') . "' AND '" . Carbon::parse($request->endDateTime[$index])->format('Y-m-d') . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s') . "'")
                                        ->first();
                                }

                                if (!empty($EventSlotsMatches)) {
                                    $EventSlotsMatch[] = $EventSlotsMatches;
                                }
                            }
                        }
                    }
                    // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                    if (count($EventSlotsMatch) > 0) {
                        return response()->json(['status' => 'events', 'message' => 'Time Conflict success', 'data' => $EventSlotsMatch]);
                    }

                    return response()->json(['status' => 200, 'message' => 'Time Conflict', 'events' => []]);
                } catch (ModelNotFoundException $exception) {
                    return back()->withError($exception->getMessage())->withInput();
                }
            } else if ($request->eventRepeatBy == '' && count($request->startDateTime) == 1) {
                try {
                    $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                    $eventPaymentIds =  EventPayment::where('user_fk_id', $user->id)->select('id', 'user_fk_id', 'event_fk_id', 'event_time_slot_id')->get();
                    $eventRowIds = [];
                    $EventSlotsMatch = [];
                    $eventRowSlotIds = [];
                    foreach ($eventIds as $eventId) {
                        $eventRowIds[] = $eventId->id;
                    }
                    foreach ($eventPaymentIds as $eventPaymentId) {
                        $eventRowSlotIds[] = $eventPaymentId->event_time_slot_id;
                    }
                    if (count($request->eventDurationSlots) > 0) {
                        foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                            [$rangeStartUtc, $rangeEndUtc] = $this->buildSingleConflictRangeUtc($eventDurationSlot, $clientTimezone);
                            if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                        $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->first();
                            } else {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->whereIn('event_fk_id', $eventRowIds)
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->first();
                            }
                            if (!empty($EventSlotsMatches)) {
                                $EventSlotsMatch[] = $EventSlotsMatches;
                            }
                        }
                    }
                    // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                    if (count($EventSlotsMatch) > 0) {
                        return response()->json(['status' => 'events', 'message' => 'Time Conflict', 'data' => $EventSlotsMatch]);
                    }
                    return response()->json(['status' => 200, 'message' => 'Time Conflict', 'data' => []]);
                } catch (ModelNotFoundException $exception) {
                    return back()->withError($exception->getMessage())->withInput();
                }
            } else {
                return response()->json(["status" => "failed", "errors" => [], 'message' => '!Oops you missed something']);
            }
        } else {
            return response()->json(["status" => "failed", "errors" => [], 'message' => 'Please login first']);
        }
    }
    public function BookingTimeConflictsChecks(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();
        if ($user) {
            if ($request->eventId > 0 && $request->slotId > 0) {
                try {
                    $eventIds =  Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                    $eventPaymentIds =  EventBooking::where('status', 'enabled')->where('p_user_id', $user->id)->get();
                    $bookingEvents =  EventTimeSlot::where('event_fk_id', $request->eventId)->where('id', $request->slotId)->get();

                    $eventRowIds = [];
                    $EventSlotsMatch = [];
                    $EventSlotsMatches = '';
                    $eventRowSlotIds = [];
                    foreach ($eventIds as $eventId) {
                        $eventRowIds[] = $eventId->id;
                    }
                    foreach ($eventPaymentIds as $eventPaymentId) {
                        $eventRowSlotIds[] = $eventPaymentId->event_slot_id;
                    }
                    if (count($bookingEvents) > 0) {
                        foreach ($bookingEvents as $key => $bookingEvent) {
                            $rangeStartUtc = Carbon::parse($bookingEvent->start_date_time, 'UTC')->format('Y-m-d H:i:s');
                            $rangeEndUtc = Carbon::parse($bookingEvent->end_date_time, 'UTC')->format('Y-m-d H:i:s');

                            if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                        $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->first();
                            } else {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($eventRowIds) {
                                        $q->WhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->where(function ($q) use ($rangeStartUtc, $rangeEndUtc) {
                                        $this->applyConflictRange($q, $rangeStartUtc, $rangeEndUtc);
                                    })
                                    ->first();
                            }
                            if (!empty($EventSlotsMatches)) {
                                $EventSlotsMatch[] = $EventSlotsMatches;
                            }
                        }
                    }
                    // return response()->json(['status' => 201, 'message' => 'Time Conflict', 'data' => [$eventRowIds,$eventRowSlotIds,$EventSlotsMatch]]);

                    if (count($EventSlotsMatch) > 0) {
                        return response()->json(['status' => 'events', 'message' => 'Time Conflict', 'data' => $EventSlotsMatch]);
                    }

                    return response()->json(['status' => 200, 'message' => 'Time Conflict', 'events' => []]);
                } catch (ModelNotFoundException $exception) {
                    return back()->withError($exception->getMessage())->withInput();
                }
            } else {
                return response()->json(["status" => "failed", "errors" => [], 'message' => '!Oops you missed something']);
            }
        } else {
            return response()->json(["status" => "failed", "errors" => [], 'message' => 'Please login first']);
        }
    }
    public function AddSlots(Request $request)
    {
        event(new UserActivity(request()->ip()));
        $user = auth()->user();

        $TimeDateArray = [];
        foreach ($request->eventDurationSlots as $TimeKey => $TimeSlot) {
            $TimeDateArray[] = [
                'StartTime' => $TimeSlot['startDateTime'],
                'EndTime' => $TimeSlot['endDateTime'],
                'Cost' => $TimeSlot['cost'],
                'EventCostType' => $TimeSlot['eventCostType'],
                'EventDuration' => $TimeSlot['eventDuration'],
                'Seats' => $TimeSlot['seats'],
                'StartDate' => $TimeSlot['startDateTime'],
                'EndDate' => $TimeSlot['endDateTime'],
                'Interval' => $TimeSlot['interval']
            ];
        }

        if (! $user) {
            return response()->json(["status" => "failed", "errors" => [], 'message' => 'Please login first']);
        }

        $event = Event::where('user_fk_id', $user->id)->where('id', $request->eventId)->first();
        if (! $event) {
            return response()->json(["status" => "failed", "errors" => [], 'message' => 'this event not exist']);
        }

        // determine client timezone (fallback to event timezone or app timezone)
        $clientTz = $request->eventTimeZone ?? $request->tz ?? $event->timezone ?? config('app.timezone') ?? 'UTC';
        // use UTC for all now checks
        $utcNow = Carbon::now('UTC');

        if ($request->eventRepeatBy != "") {
            try {
                $eventIds = Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                $eventPaymentIds = EventPayment::where('user_fk_id', $user->id)->select('id', 'event_fk_id', 'user_fk_id', 'event_time_slot_id')->get();

                $eventRowIds = $eventIds->pluck('id')->all();
                $eventRowSlotIds = $eventPaymentIds->pluck('event_time_slot_id')->all();

                $EventSlotsMatch = [];

                if (count($request->startDateTime) == count($request->endDateTime) && count($request->eventDurationSlots) > 0) {
                    foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                        foreach ($request->startDateTime as $index => $startDateTime) {
                            // Build local datetimes and convert to UTC for comparison/search
                            $localStartStr = $startDateTime . ' ' . Carbon::parse($eventDurationSlot['startDateTime'])->format('H:i:s');
                            $localEndStr = $request->endDateTime[$index] . ' ' . Carbon::parse($eventDurationSlot['endDateTime'])->format('H:i:s');

                            $utcStart = Carbon::parse($localStartStr, $clientTz)->setTimezone('UTC');
                            $utcEnd = Carbon::parse($localEndStr, $clientTz)->setTimezone('UTC');

                            if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                                $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                    $q->select('id', 'event_title', 'user_fk_id');
                                }])
                                    ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                        $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                    })
                                    ->where(function ($q) use ($utcStart, $utcEnd, $eventDurationSlot) {
                                        $endCompare = $eventDurationSlot['interval'] > 0 ? $utcEnd->copy()->addDays($eventDurationSlot['interval']) : $utcEnd;
                                        $q->whereBetween('start_date_time', [$utcStart->format('Y-m-d H:i:s'), $endCompare->format('Y-m-d H:i:s')])
                                            ->orWhereBetween('end_date_time', [$utcStart->format('Y-m-d H:i:s'), $endCompare->format('Y-m-d H:i:s')]);
                                    })
                                    ->first();
                            } else {
                                $EventSlotsMatches = EventTimeSlot::whereIn('event_fk_id', $eventRowIds)
                                    ->with(['Events' => function ($q) {
                                        $q->select('id', 'event_title', 'user_fk_id');
                                    }])
                                    ->where(function ($q) use ($utcStart, $utcEnd, $eventDurationSlot) {
                                        $endCompare = $eventDurationSlot['interval'] > 0 ? $utcEnd->copy()->addDays($eventDurationSlot['interval']) : $utcEnd;
                                        $q->whereBetween('start_date_time', [$utcStart->format('Y-m-d H:i:s'), $endCompare->format('Y-m-d H:i:s')])
                                            ->orWhereBetween('end_date_time', [$utcStart->format('Y-m-d H:i:s'), $endCompare->format('Y-m-d H:i:s')]);
                                    })
                                    ->first();
                            }

                            if (! empty($EventSlotsMatches)) {
                                $EventSlotsMatch[] = $EventSlotsMatches;
                            }
                        }
                    }
                }

                if (count($EventSlotsMatch) > 0) {
                    return response()->json(['status' => 'events', 'message' => 'Time Conflict success', 'data' => $EventSlotsMatch]);
                }

                // no conflicts -> create slots
                try {
                    DB::beginTransaction();
                    if (count($request->startDateTime) === count($request->endDateTime) || count($request->eventDurationSlots) > 0) {
                        if ($request->eventRepeatBy != '') {
                            foreach ($TimeDateArray as $TimeSlot) {
                                foreach ($request->startDateTime as $index => $startDateTime) {
                                    // construct local datetimes then convert to UTC
                                    $localStartStr = $startDateTime . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s');
                                    $localEndStr = $request->endDateTime[$index] . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s');

                                    $utcStart = Carbon::parse($localStartStr, $clientTz)->setTimezone('UTC');
                                    $utcEnd = Carbon::parse($localEndStr, $clientTz)->setTimezone('UTC');

                                    // ensure start is in future relative to UTC now
                                    if ($utcStart->greaterThan($utcNow)) {
                                        $eventTimeSlot = new EventTimeSlot();
                                        $eventTimeSlot->event_fk_id = $event->id;
                                        $eventTimeSlot->meeting_room_id = rand(0, 9999) . substr(time(), -4) . Str::random(24);
                                        $eventTimeSlot->cost_type = $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free';
                                        $eventTimeSlot->cost = $TimeSlot['Cost'];
                                        $eventTimeSlot->duration = $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60;
                                        $eventTimeSlot->total_seats = $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20;

                                        $eventTimeSlot->start_date = $utcStart->format('Y-m-d');
                                        if ($TimeSlot['Interval'] > 0) {
                                            $utcEndWithInterval = $utcEnd->copy()->addDays($TimeSlot['Interval']);
                                            $eventTimeSlot->end_date = $utcEndWithInterval->format('Y-m-d');
                                            $eventTimeSlot->end_date_time = $utcEndWithInterval->format('Y-m-d H:i:s');
                                        } else {
                                            $eventTimeSlot->end_date = $utcEnd->format('Y-m-d');
                                            $eventTimeSlot->end_date_time = $utcEnd->format('Y-m-d H:i:s');
                                        }

                                        $eventTimeSlot->start_time = $utcStart->format('H:i:s');
                                        $eventTimeSlot->end_time = ($TimeSlot['Interval'] > 0 ? $utcEnd->copy()->addDays($TimeSlot['Interval']) : $utcEnd)->format('H:i:s');

                                        $eventTimeSlot->start_date_time = $utcStart->format('Y-m-d H:i:s');

                                        $eventTimeSlot->status = "enabled";
                                        $eventTimeSlot->remember_token = Str::random(60);
                                        $eventTimeSlot->save();
                                    }
                                }
                            }
                            DB::commit();
                            return response()->json(['status' => 200, 'message' => 'Slots added successfully', 'data' => []]);
                        }
                    }
                    DB::commit();
                } catch (\Throwable $th) {
                    DB::rollBack();
                    return response()->json(["status" => "failed", "errors" => [], 'message' => '!Oops']);
                }
                return response()->json(['status' => 200, 'message' => 'Time Conflict', 'data' => []]);
            } catch (ModelNotFoundException $exception) {
                return back()->withError($exception->getMessage())->withInput();
            }
        } else {
            // non repeating
            try {
                $eventIds = Event::where('user_fk_id', $user->id)->select('id', 'user_fk_id')->get();
                $eventPaymentIds = EventPayment::where('user_fk_id', $user->id)->select('id', 'user_fk_id', 'event_fk_id', 'event_time_slot_id')->get();

                $eventRowIds = $eventIds->pluck('id')->all();
                $eventRowSlotIds = $eventPaymentIds->pluck('event_time_slot_id')->all();
                $EventSlotsMatch = [];

                if (count($request->eventDurationSlots) > 0) {
                    foreach ($request->eventDurationSlots as $key => $eventDurationSlot) {
                        $localStartStr = Carbon::parse($eventDurationSlot['startDateTime'])->format('Y-m-d H:i:s');
                        $localEndStr = Carbon::parse($eventDurationSlot['endDateTime'])->format('Y-m-d H:i:s');

                        $utcStart = Carbon::parse($localStartStr, $clientTz)->setTimezone('UTC');
                        $utcEnd = Carbon::parse($localEndStr, $clientTz)->setTimezone('UTC');

                        if (count($eventRowSlotIds) > 0 && count($eventRowIds) > 0) {
                            $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                $q->select('id', 'event_title', 'user_fk_id');
                            }])
                                ->where(function ($q) use ($eventRowSlotIds, $eventRowIds) {
                                    $q->orWhereIn('id', $eventRowSlotIds)->orWhereIn('event_fk_id', $eventRowIds);
                                })
                                ->where(function ($q) use ($utcStart, $utcEnd) {
                                    $q->whereBetween('start_date_time', [$utcStart->format('Y-m-d H:i:s'), $utcEnd->format('Y-m-d H:i:s')])
                                        ->orWhereBetween('end_date_time', [$utcStart->format('Y-m-d H:i:s'), $utcEnd->format('Y-m-d H:i:s')]);
                                })
                                ->first();
                        } else {
                            $EventSlotsMatches = EventTimeSlot::with(['Events' => function ($q) {
                                $q->select('id', 'event_title', 'user_fk_id');
                            }])
                                ->whereIn('event_fk_id', $eventRowIds)
                                ->where(function ($q) use ($utcStart, $utcEnd) {
                                    $q->whereBetween('start_date_time', [$utcStart->format('Y-m-d H:i:s'), $utcEnd->format('Y-m-d H:i:s')])
                                        ->orWhereBetween('end_date_time', [$utcStart->format('Y-m-d H:i:s'), $utcEnd->format('Y-m-d H:i:s')]);
                                })
                                ->first();
                        }

                        if (! empty($EventSlotsMatches)) {
                            $EventSlotsMatch[] = $EventSlotsMatches;
                        }
                    }
                }

                if (count($EventSlotsMatch) > 0) {
                    return response()->json(['status' => 'events', 'message' => 'Time Conflict', 'data' => $EventSlotsMatch]);
                } else {
                    try {
                        DB::beginTransaction();
                        foreach ($TimeDateArray as $TimeSlot) {
                            // Expect StartDate is date and StartTime contains time info or StartTime is full datetime
                            $localStartStr = Carbon::parse($TimeSlot['StartDate'])->format('Y-m-d') . ' ' . Carbon::parse($TimeSlot['StartTime'])->format('H:i:s');
                            $localEndStr = Carbon::parse($TimeSlot['EndDate'])->format('Y-m-d') . ' ' . Carbon::parse($TimeSlot['EndTime'])->format('H:i:s');

                            $utcStart = Carbon::parse($localStartStr, $clientTz)->setTimezone('UTC');
                            $utcEnd = Carbon::parse($localEndStr, $clientTz)->setTimezone('UTC');

                            // ensure start is in future
                            if ($utcStart->lessThan($utcNow)) {
                                // skip past slots
                                continue;
                            }

                            $eventTimeSlot = new EventTimeSlot();
                            $eventTimeSlot->event_fk_id = $event->id;
                            $eventTimeSlot->meeting_room_id = rand(0, 9999) . substr(time(), -4) . Str::random(24);
                            $eventTimeSlot->cost_type = $TimeSlot['EventCostType'] ? $TimeSlot['EventCostType'] : 'free';
                            $eventTimeSlot->cost = $TimeSlot['Cost'];
                            $eventTimeSlot->duration = $TimeSlot['EventDuration'] > 0 ? $TimeSlot['EventDuration'] : 60;
                            $eventTimeSlot->total_seats = $TimeSlot['Seats'] > 0 && $TimeSlot['Seats'] <= 20 ? $TimeSlot['Seats'] : 20;

                            $eventTimeSlot->start_date = $utcStart->format('Y-m-d');
                            $eventTimeSlot->start_time = $utcStart->format('H:i:s');

                            if ($TimeSlot['Interval'] > 0) {
                                $utcEndWithInterval = $utcEnd->copy()->addDays($TimeSlot['Interval']);
                                $eventTimeSlot->end_date = $utcEndWithInterval->format('Y-m-d');
                                $eventTimeSlot->end_date_time = $utcEndWithInterval->format('Y-m-d H:i:s');
                                $eventTimeSlot->end_time = $utcEndWithInterval->format('H:i:s');
                            } else {
                                $eventTimeSlot->end_date = $utcEnd->format('Y-m-d');
                                $eventTimeSlot->end_date_time = $utcEnd->format('Y-m-d H:i:s');
                                $eventTimeSlot->end_time = $utcEnd->format('H:i:s');
                            }

                            $eventTimeSlot->start_date_time = $utcStart->format('Y-m-d H:i:s');

                            $eventTimeSlot->status = "enabled";
                            $eventTimeSlot->remember_token = Str::random(60);
                            $eventTimeSlot->save();
                        }
                        DB::commit();
                        return response()->json(['status' => 200, 'message' => 'Slots added successfully', 'data' => []]);
                    } catch (\Throwable $th) {
                        DB::rollback();
                        return response()->json(["status" => "failed", "errors" => [], 'message' => '!Oops']);
                    }
                }
            } catch (ModelNotFoundException $exception) {
                return back()->withError($exception->getMessage())->withInput();
            }
        }
    }

    private function resolveClientTimezone(Request $request): string
    {
        $timezone = $request->tz;

        if (is_string($timezone) && in_array($timezone, timezone_identifiers_list(), true)) {
            return $timezone;
        }

        return config('app.timezone', 'UTC');
    }

    private function buildRepeatedConflictRangeUtc(string $startDate, string $endDate, array $eventDurationSlot, string $timezone): array
    {
        $slotStart = Carbon::parse($eventDurationSlot['startDateTime'], $timezone);
        $slotEnd = Carbon::parse($eventDurationSlot['endDateTime'], $timezone);

        $rangeStart = Carbon::parse($startDate, $timezone)->setTime($slotStart->hour, $slotStart->minute, $slotStart->second);
        $rangeEnd = Carbon::parse($endDate, $timezone)
            ->setTime($slotEnd->hour, $slotEnd->minute, $slotEnd->second)
            ->addDays((int) ($eventDurationSlot['interval'] ?? 0));

        return [
            $rangeStart->copy()->utc()->format('Y-m-d H:i:s'),
            $rangeEnd->copy()->utc()->format('Y-m-d H:i:s'),
        ];
    }

    private function buildSingleConflictRangeUtc(array $eventDurationSlot, string $timezone): array
    {
        $rangeStart = Carbon::parse($eventDurationSlot['startDateTime'], $timezone)->utc();
        $rangeEnd = Carbon::parse($eventDurationSlot['endDateTime'], $timezone)->utc();

        return [
            $rangeStart->format('Y-m-d H:i:s'),
            $rangeEnd->format('Y-m-d H:i:s'),
        ];
    }

    private function applyConflictRange($query, string $rangeStartUtc, string $rangeEndUtc)
    {
        return $query
            ->where('start_date_time', '<', $rangeEndUtc)
            ->where('end_date_time', '>', $rangeStartUtc);
    }
}
