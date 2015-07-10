<!DOCTYPE html>
<html>
    <head>
        <title>Memphis</title>
        <link href="//fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{ url() }}/css/styles.css">
    </head>
    <body>

        <div id="main-wrap" class="{{ $action }}">

            @yield('content')

        </div>

        <script>

            function downloadCsv ()
            {
                document.getElementById('downloadForm').submit();
            }

            var btn = document.querySelector('#confirmSaveBtn');

            if ( btn )
            {
                btn.addEventListener( 'click', downloadCsv )
            }

        </script>
        <script type="text/javascript" src="{{ asset( 'js/scripts.min.js' ) }}"></script>
    </body>
</html>
