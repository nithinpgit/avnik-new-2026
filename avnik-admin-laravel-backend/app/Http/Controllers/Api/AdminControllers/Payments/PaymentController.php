<?php

namespace App\Http\Controllers\Api\AdminControllers\Payments;

use App\Http\Controllers\Controller;
use App\Models\Events\EventPayment;
use App\User;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        return $request;
        //
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        // $amount = $request->amount;
        $user = User::where('id',$request->userId)->first();
        try {
            // Create a payout to the connected bank account
            // $payout= $stripe->payouts->create([
            //     'amount' => $amount/80*100 * 100, // Amount in cents
            //     'currency' => 'usd', // Currency code
            //     'destination' => 'acct_1E46ZfH1Lp8M6ebR',
            //     'method' => 'instant',
            //   ]);
            if($user){
                // if ($user->sca_id) {
                    $payment=EventPayment::where('id',$request->paymentId)->first();
                    if($payment){
                    // $payout =
                    //     $stripe->transfers->create([
                    //         'amount' => $payment->amount * 80 / 100 * 100,
                    //         'currency' => 'usd',
                    //         //   'method' => 'instant',
                    //         'destination' => $user->sca_id,
                    //     ]);
                        $pmOut= EventPayment::where('amount', '>', 0)
                        ->where('id', $request->paymentId)
                        ->where('to_user', $user->id)
                        ->update([
                            "released"=>1,
                        ]);
                    }else{
                        return response()->json(['message' => 'Payment Not Found', 'payout' => []]);
                    }
                    return response()->json(['message' => 'Payout initiated successfully', 'payout' => $pmOut]);
                // } else {
                //     return response()->json(['message' => 'User need to setup the bank account '], 201);
                // }
            }else{
                return response()->json(['message' => 'user does not exist'], 201);

            }
            

            // $payout =  $stripe->accounts->delete(
            //     'acct_1DzUOGLumjXBC5uP',
            //     []
            //   );
            // Handle success, update your database, send response, etc.
        } catch (\Exception $e) {
            // Handle payout error
            return response()->json(['error' => $e->getMessage()], 500);
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
    public function edit($id)
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
    }
}
