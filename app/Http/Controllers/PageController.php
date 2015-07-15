<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use League\Csv\Reader;
use League\Csv\Writer;
use Request;
use SplTempFileObject;

class PageController extends Controller
{

    public function upload ()
    {
        return view('upload')->with( 'action', __FUNCTION__ );
    }

    public function edit ()
    {
        $id = uniqid();
        $filePath = storage_path() . '/app/csv';
        $fileName =  "$id.csv";
        $theOriginalFile = Request::file('file');

        //get original file name
        $originalFileName = $theOriginalFile->getClientOriginalName();

        //get original file extension for future reusability of project
        $originalFileExtension = $theOriginalFile->getClientOriginalExtension();

        $theOriginalFile->move( $filePath, $fileName );

        $inputCsv = Reader::createFromPath( $filePath . '/' . $fileName );
        $inputCsv->setDelimiter(',');

        //get the header
        $headers = $inputCsv->fetchOne(0);

        //get at maximum 25 rows starting from the 801th row
        $res = $inputCsv->setOffset(0)/*->setLimit(25)*/->fetchAll();

        $lines = new Collection($res);

        return view('edit')
                 ->with( 'action', __FUNCTION__ )
                 ->with( 'lines', $lines )
                 ->with( 'fileId', $id )
                 ->with( 'originalFileName', $originalFileName )
                 ->with( 'originalFileExtension', $originalFileExtension );
    }

    public function download ()
    {
        $col = new Collection(Request::input('data'));
//dd();
        //we create the CSV into memory
        $csv = Writer::createFromFileObject(new SplTempFileObject());

        $csv->insertAll($col);

        // Because you are providing the filename you don't have to
        // set the HTTP headers Writer::output can
        // directly set them for you
        // The file is downloadable
        if(Request::input('newFileName') != ''){
            $csv->output( Request::input('newFileName') . '.csv' );
        } else {
            $csv->output( Request::input('originalFileName') );
        }
        die;
    }

}
