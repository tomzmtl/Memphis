@extends('master')

@section('content')

    <header>
        <div id="headerLeft">
            <h1><span>M</span>emphis</h1>
            <div class="sub">CSV edition for Magento</div>
        </div>

        <div id="headerRight">
            <input type="text" id="newFileNameInput" placeholder="New File Name">
            <button id="confirmSaveBtn" class="btn">Confirm & Download</button>
        </div>
    </header>

    <main>

        {!! Form::open([ 'url' => 'download', 'id' => 'downloadForm' ]) !!}

            <input type="hidden" name="id" value="{{ $fileId }}">
            <input type="hidden" name="originalFileName" value="{{ $originalFileName }}">
            <input type="hidden" name="originalFileExtension" value="{{ $originalFileExtension }}">
            <input type="hidden" name="newFileName" id="newFileName" value="">
            
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