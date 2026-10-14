@extends('layouts.app')

@section('content')
<main> 
    <section class="sign-in-up-sec">
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif
        <div class="container-flex-bx" style="background-image: url('{{asset('assets/images/sign-in-up-page-bg.svg')}}');">
            <div class="wrap-l-s-bx">
                <div class="login-signup-form">
                    <figure class="sign-in-up-logo-icon">
                        <img src="{{asset('assets/images/sign-in-up-logo-icon.svg')}}" alt=""/>
                    </figure>
                    <div class="form-heading">
                        <h1>Forgot Password</h1>
                        <p>Typing your below to reset your password</p>
                    </div>
                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf   
                        @error('email')
                            <span class="alert alert-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror                    
                        <div class="form-group">
                            <label class="form-label" for="InputEmail1">Email</label>
                            <div class="icon-input-box">
                                <input type="email"  class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Enter email address">
                                <span class="input-icon" data-placeholder="&#xe905;"></span>
                            </div>
                        </div>         
                        <div class="form-group form-forgot-btns">
                            <button type="submit" class="btn default-btn">Reset</button>
                            <div class="or-text">Or</div>
                            <div class="f-sign-in-link"><a href="sign-in.html">Sign in</a></div>
                        </div>                           
                    </form>
                </div>
            </div>
        </div>
</section>
</main>
{{-- <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Send Password Reset Link') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
@endsection
