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
                    <div class="skip-link">
                        <a href="home.html">Skip</a>
                    </div>
                    <div class="form-heading">
                        <h1>Let's Get Started </h1>
                        <p>Sign in to continue to Avnik</p>
                    </div>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                        <div class="form-group">
                            <label class="form-label" for="InputEmail1">Email address</label>
                            <div class="icon-input-box">
        
                                <input type="email" class="form-control  @error('email') is-invalid @enderror" id="InputEmail1" name="email"  aria-describedby="emailHelp" value="{{ old('email') }}" placeholder="Enter email address" required autocomplete="email" autofocus>
                                <span class="input-icon" data-placeholder="&#xe905;"></span>
                            </div>
                        </div>
                        @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                        <div class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Password</label>
                            <div class="icon-input-box password">
            
                                <input type="password" class="form-control @error('password') is-invalid @enderror" id="exampleInputPassword1" placeholder="Enter Password" name="password" required autocomplete="current-password">
                                <span class="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        <div class="form-group form-ck-forgot-p-link">
                            <div class="checkbox custom">
                                <label>
                                    
                                    <input type="checkbox" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                    Remember Me
                                </label>
                            </div>
                            @if (Route::has('password.request'))
                            <div class="forgot-link">
                                <a href="{{ route('password.request') }}">{{ __('Forgot Your Password?') }}</a>
                            </div>
                            @endif

                        </div>
                        <div class="form-group form-btns-social">
                            <button type="submit" class="btn default-btn">Sign In</button>
                            <div class="footer-social-icn">
                                <ul>
                                    <li class="text-btm">Or Sign in with</li>
                                    <li class="fb"><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li class="google"><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                    <li class="twitter"><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="or-sign-in-up-link">
                            <p>New user? <a href="{{ route('register') }}">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>


</section>
</main>

@endsection
