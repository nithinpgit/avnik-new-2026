<?php

namespace App\Http\Controllers\Api\UserControllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Categories\Categories;
use Illuminate\Http\Request;

class EventsCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showParentCategories()
    {
        //
        $categories = Categories::orderBy('name')->where('parentId',0)->get();
        try {
            return response()->json(["status" => 200, 'message' => 'fetch categories', 'data' => $categories]);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
        return response()->json(["status" => "failed", 'message' => 'fetch categories', 'data' => []]);
    }
    public function showChildCategories(Request $request)
    {
        //
        $categories = Categories::where('parentId', $request->parentId)->orderBy('name')->get();
        try {
            return response()->json(["status" => 200, 'message' => 'fetch categories', 'data' => $categories]);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
        return response()->json(["status" => "failed", 'message' => 'fetch categories', 'data' => []]);
    }
}
