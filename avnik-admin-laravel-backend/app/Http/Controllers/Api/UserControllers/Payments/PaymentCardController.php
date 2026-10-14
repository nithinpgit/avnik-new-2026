<?php

namespace App\Http\Controllers\Api\UserControllers\Payments;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        $user = auth()->user();
        try {
            if ($user->stripe_customer_id) {
                $customerPaymentMethods =
                    $stripe->paymentMethods->all([
                        'customer' => $user->stripe_customer_id,
                        'type' => 'card',
                    ]);
                return response()->json($customerPaymentMethods);
            } else {
                return response()->json([]);
            }
        } catch (\Exception $th) {
            return $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        $user=auth()->user();
        $validator =  Validator::make($request->all(), [
            'paymentMethod' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => "failed","message"=>"validation error", "validation_error" => $validator->errors()]);
        }else{
            
            try {
                if ($user->stripe_customer_id) {
                    // Get all existing cards for the customer
                    $existingCards = $stripe->paymentMethods->all([
                        'customer' => $user->stripe_customer_id,
                        'type' => 'card',
                    ]);

                    // Retrieve the new payment method details
                    $newPaymentMethod = $stripe->paymentMethods->retrieve($request->paymentMethod, []);

                    // Check for duplicate card by comparing last4 and brand
                    foreach ($existingCards->data as $card) {
                        if (
                            isset($card->card) &&
                            $card->card->last4 === $newPaymentMethod->card->last4 &&
                            $card->card->brand === $newPaymentMethod->card->brand &&
                            $card->card->exp_month === $newPaymentMethod->card->exp_month &&
                            $card->card->exp_year === $newPaymentMethod->card->exp_year
                        ) {
                            return response()->json([
                                "status" => "failed",
                                "message" => "This card is already added."
                            ], 409);
                        }
                    }

                    $attached = $stripe->paymentMethods->attach(
                        $request->paymentMethod,
                        ['customer' => $user->stripe_customer_id]
                    );
                    return response()->json($attached);
                } else {
                    $customer = $stripe->customers->create([
                        'description' => $user->name,
                        'email' => $user->email,
                    ]);
                    $attached = $stripe->paymentMethods->attach(
                        $request->paymentMethod,
                        ['customer' => $customer->id]
                    );
                    User::where('id', $user->id)->update([
                        "stripe_customer_id" => $customer->id
                    ]);
                    return response()->json($attached);
                }
            } catch (\Exception $th) {
                return response()->json([
                    "status" => "failed",
                    "message" => $th->getMessage()
                ], 500);
            }
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function verified($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        // return $id;
        try {
            $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
            $detached = $stripe->paymentMethods->detach(
                $id,
                []
            );
            return response()->json($detached);
        } catch (\Exception $th) {
            return $th;
        }
    }
}
