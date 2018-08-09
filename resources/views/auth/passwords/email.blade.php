@extends('layouts.app')

@section('content')
<section class="login">
    <div class="direct">
        <div class="signin_form">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}" aria-label="{{ __('Reset Password') }}">
                        @csrf
                        <div class="reset_label">
                            <label for="email">{{ __('E-Mail Address') }}</label>
                            <input id="email" type="email" name="email" value="{{ old('email') }}" required>
                        </div>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif

                        <button type="submit">
                            {{ __('Send Password Reset Link') }}
                        </button>
                    </form>
                </div>
    </div>
</section>
@endsection
