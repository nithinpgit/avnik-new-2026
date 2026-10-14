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
                        <a href="{{url('/')}}">Skip</a>
                    </div>
                    <div class="form-heading">
                        <h1>Free Register for avnik </h1>
                        <p>Get your free Avnik account now.</p>
                    </div>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        
                        @error('name')
                               
                        <div class="alert alert-danger">
                            <ul>
                                    <li>{{ $message }}</li>
                            </ul>
                        </div>
                        {{-- <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span> --}}
                        @enderror
                        <div class="form-group">
                            <label class="form-label" for="InputEmail1">Full Name</label>
                            <div class="icon-input-box">
                                <input type="text" class="form-control @error('name') is-invalid @enderror"  aria-describedby="emailHelp" placeholder="Enter full address" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                                <span class="input-icon" data-placeholder="&#xe929;"></span>
                            </div>
                        </div>
                        @error('email')
                        <div class="alert alert-danger">
                            <ul>
                                    <li>{{ $message }}</li>
                            </ul>
                        </div>
                        @enderror
                        <div class="form-group">
                            <label class="form-label" for="InputEmail1">Email address</label>
                            <div class="icon-input-box">
                                <input type="email" class="form-control @error('email') is-invalid @enderror" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email address"  name="email" value="{{ old('email') }}" required autocomplete="email">
                                <span class="input-icon" data-placeholder="&#xe905;"></span>
                            </div>
                        </div>
                        @error('password')
                        <div class="alert alert-danger">
                            <ul>
                                    <li>{{ $message }}</li>
                            </ul>
                        </div>
                    @enderror
                        <div class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Password</label>
                            <div class="icon-input-box password">
                            
                                <input type="password" class="form-control @error('password') is-invalid @enderror" id="exampleInputPassword1" placeholder="Enter Password" name="password" required autocomplete="new-password">
                                <span class="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="exampleInputPassword1">Confirm Password</label>
                            <div class="icon-input-box password">
                    
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" name="password_confirmation" required autocomplete="new-password">
                                <span class="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        <div class="form-group form-ck-forgot-p-link">
                            <div class="checkbox custom">
                                <label>
                                    <input type="checkbox" name="terms_of_use" id="terms_of_use" {{ old('terms_of_use') ? 'checked' : '' }}>
                                    By registering you agree to the Avnik <a href="terms-of-use.html">Terms of Use</a>
                                </label>
                            </div>
                            

                        </div>
                        <div class="form-group form-btns-social">
                            <button type="submit" class="btn default-btn">Sign Up</button>
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
                            <p>Already  have a account? <a href="{{ route('login') }}">Sign In</a></p>
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
                <div class="card-header">{{ __('Register') }}</div>
                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
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
