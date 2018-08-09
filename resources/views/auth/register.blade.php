@extends('layouts.app')

@section('content')
<section class="signin">
    <div class="direct">
        <h1>Sign in</h1>
        <div class="signin_form">
            <form method="POST" action="{{ route('register') }}" aria-label="{{ __('Register') }}">
                @csrf
                @if(session()->has('message'))
                <div class="alert alert-success">
                  {{ session()->get('message') }}
                </div>
                @endif

                <input type="text" placeholder="{{ __('Username') }}" class="{{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus>
                @if ($errors->has('username'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('username') }}</strong>
                    </span>
                 @endif

                <input type="text" placeholder="{{ __('First Name') }}" class="{{ $errors->has('first_name') ? ' is-invalid' : '' }}" name="first_name" value="{{ old('first_name') }}" required autofocus>
                @if ($errors->has('first_name'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('first_name') }}</strong>
                    </span>
                 @endif

                 <input type="text" placeholder="{{ __('Familly Name') }}" class="{{ $errors->has('familly_name') ? ' is-invalid' : '' }}" name="familly_name" value="{{ old('familly_name') }}" required autofocus>
                @if ($errors->has('familly_name'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('familly_name') }}</strong>
                    </span>
                 @endif

                 <input type="email" placeholder="{{ __('Email') }}" class="{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                 @endif

                 <input type="text" placeholder="{{ __('Country') }}" class="{{ $errors->has('country') ? ' is-invalid' : '' }}" name="country" value="{{ old('country') }}" required autofocus>
                @if ($errors->has('country'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('country') }}</strong>
                    </span>
                 @endif

                 <input type="text" placeholder="{{ __('City') }}" class="{{ $errors->has('city') ? ' is-invalid' : '' }}" name="city" value="{{ old('city') }}" required autofocus>
                @if ($errors->has('city'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('city') }}</strong>
                    </span>
                 @endif

                 <input type="password" placeholder="{{ __('Password') }}" class="{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" value="{{ old('password') }}" required autofocus>
                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                 @endif

                <button type="submit">
                    {{ __('Register') }}
                </button>
            </form>
        </div>

        <div class="middle_line"><hr/><span>or</span><hr/></div>

        <div class="signup_fb_google">
            
        </div>
    </div>
</section>
@endsection
