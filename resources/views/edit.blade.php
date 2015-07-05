@extends('master')

@section('content')

    <header>
        <h1><span>M</span>emphis</h1>
        <button id="confirmSaveBtn" class="btn">Confirm & Download</button>
    </header>

    <main>

        {!! Form::open([ 'url' => 'download', 'id' => 'downloadForm' ]) !!}

            <input type="hidden" name="id" value="{{ $fileId }}">

            <ul>

                @for ( $i = 0 ; $i < count($lines) ; $i++ )

                    <li>
                        {!! Form::textarea( 'data['.$i.'][]', $lines[$i][0] ) !!}
                        <span class="arrow">→</span>
                        {!! Form::textarea( 'data['.$i.'][]', $lines[$i][1] ) !!}

                    </li>

                @endfor

            </ul>

        {!! Form::close() !!}

    </main>

@stop