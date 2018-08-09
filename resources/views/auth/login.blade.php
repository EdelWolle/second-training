@extends('layouts.app')

@section('content')
<section class="login">
    <div class="direct">
        <h1>Log in</h1>
        <div class="signin_form">
            <form method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
                @csrf
                @if(session()->has('login_error'))
                <div class="alert alert-success">
                  {{ session()->get('login_error') }}
                </div>
                @endif
                
                    <span role="alert">
                        <strong>{{ session()->get('msg')  }}</strong>
                    </span>
                

                 <input type="email" placeholder="{{ __('Email') }}" name="email" value="{{ old('email') }}" autofocus>
                @if ($errors->has('email'))
                    <span role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                 @endif

                 <input type="password" placeholder="{{ __('Password') }}" name="password" value="{{ old('password') }}" autofocus>
                @if ($errors->has('password'))
                    <span role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                 @endif

                <button type="submit">
                    {{ __('Login') }}
                </button>
            </form>
        </div>

        <div class="middle_line"><hr/><span>or</span><hr/></div>

        <div class="signup_fb_google">
            
        </div>
    </div>
    <div class="new_account_password">
        <span><a  href="{{ route('register') }}">{{ __("Doesn't have an account? Create one now free") }}</a></span>
        <span><a  href="{{ route('password.request') }}">{{ __('Forgot Your Password?') }}</a></span>
    </div>
</section>
@endsection
