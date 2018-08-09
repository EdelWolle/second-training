<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta id="csrf-token" name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="root">
        <div class="layout_desktop">
            <header class="header">
                <nav class="main_menu">
                    <ul class="desktop_items">
                        <li class="nav-item">
                            <a href="/">Hire</a>
                        </li>
                    </ul>

                    <ul class="desktop_items">
                        <li class="nav-item">
                            <a href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                    </ul>
                </nav>
            </header>

            @yield('content')


            <div class="footer">
               <footer>
                   <small>
                       © <?php echo date('Y'); ?> website<span></span><a href="#">Cookies, Privacy and Terms</a>
                   </small>
               </footer>
            </div>
        </div>
    </div>
</body>
</html>
