@extends('layouts.app')

@section('content')
<main> 
    <section class="sign-in-up-sec">
        <div class="container-flex-bx" style="background-image: url('{{asset('assets/images/sign-in-up-page-bg.svg')}}');">
            <div class="wrap-l-s-bx">
                <div class="login-signup-form">
                    <figure class="sign-in-up-logo-icon">
                        <img src="{{asset('assets/images/sign-in-up-logo-icon.svg')}}" alt=""/>
                    </figure>
                    <div class="form-heading">
                        <h1>Reset password</h1>
                        <p>Get your free Avnik account now.</p>
                    </div>
                    <form method="POST" action="{{ route('password.update') }}">
                        @csrf

                        <input type="hidden" name="token" value="{{ $token }}">
                        @error('email')
                                    <span class="alert alert-danger" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                        <div class="form-group">
                            <label class="form-label" for="InputEmail1">Email</label>
                            <div class="icon-input-box">
                                <input type="email"  type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus placeholder="Enter email address">
                                <span class="input-icon" data-placeholder="&#xe905;"></span>
                            </div>
                        </div>
                        @error('password')
                            <span class="alert alert-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                        <div class="form-group">
                            <label class="form-label" for="exampleInputPassword1">New Password</label>
                            <div class="icon-input-box password">
                                <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" placeholder="Enter new password">
                                <span class="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Confirm Password</label>
                            <div class="icon-input-box password">
                                <input type="password" class="form-control" name="password_confirmation" required autocomplete="new-password" placeholder="Enter new confirm password">
                                <span class="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        <div class="form-group form-forgot-btns">
                            <button type="submit" class="btn default-btn">Change Password</button>
                            <div class="or-text">Or</div>
                            <div class="f-sign-in-link"><a href="#">Sign in</a></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</section>
</main>

@endsection
