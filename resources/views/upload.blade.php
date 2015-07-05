@extends('master')

@section('content')

    <main>

        <h1>
            <span class="title"><span>M</span>emphis</span>
            <div class="sub">CSV edition for Magento</div>
        </h1>

        {!! Form::open([ 'url' => 'edit', 'method' => 'POST', 'files' => true ]) !!}

            {!! Form::file('file') !!}

            {!! Form::submit() !!}

        {!! Form::close() !!}

    </main>

@stop
