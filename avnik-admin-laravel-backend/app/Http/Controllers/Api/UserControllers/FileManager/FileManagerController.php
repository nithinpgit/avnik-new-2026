<?php

namespace App\Http\Controllers\Api\UserControllers\FileManager;

use App\Helpers\HumanReadable;
use App\Http\Controllers\Controller;
use App\Models\Events\Event;
use App\Models\Events\EventFile;
use App\Models\Events\EventFilePayment;
use App\Models\FileManager\FileManager;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;


class FileManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    private $status_code=200;

     public function showAuthUserFiles(request $request)
    {
        //
        if($request->filterBy=="Purchased"){
            $eventFilePaymentIds=EventFilePayment::where('user_fk_id',auth()->user()->id)->pluck('event_file_fk_id');
            // return $eventFilePaymentIds;
            $MyFiles  = FileManager::whereIn('id',$eventFilePaymentIds)->where('name','LIKE',"%".$request->searchQuery."%")->select('id','user_id','name','date_time','isDirectory','size','file_url','file_path','type','from')->orderBy('id','DESC')->paginate(24);

        }else{
            $MyFiles  = FileManager::where('user_id',auth()->user()->id)->where('name','LIKE',"%".$request->searchQuery."%")->select('id','user_id','name','date_time','isDirectory','size','file_url','file_path','type','from')->orderBy('id','DESC')->paginate(24);
        }
        return response()->json(["status" => $this->status_code, "data" =>$MyFiles,'message'=>"fetched"]);
            
    }
    public function saveRecordings(request $request){

        $validator =  Validator::make($request->all(),[
            'roomId' => 'required',
            'fileName' => 'required',
            'userId' => 'required',
        ]);
        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }else{
            $url = 'http://95.217.181.254/'.$request->fileName.'.webm'; // replace with your file URL
            $response = Http::head($url);
            $fileSize = HumanReadable::bytesToHuman($response->header('Content-Length'));
            $fileData= new FileManager();
            $fileData->user_id=$request->userId;
            $fileData->date_time=Carbon::now();
            $fileData->size=$fileSize?$fileSize:'0KB';
            $fileData->name=$request->fileName;
            $fileData->isDirectory=0;
            $fileData->file_url='http://95.217.181.254/'.''.$request->fileName.''.'.webm';
            $fileData->file_path='http://95.217.181.254/'.''.$request->fileName.''.'.webm';
            $fileData->type='webm';
            $fileData->remember_token=Str::random(60);
            $fileData->save();
        }
        

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createFolder(Request $request)
    {
        //
        $validator =  Validator::make($request->all(),[
            'folderName' => 'required|unique:file_managers,name,',
        ]);

        if($validator->fails()) {
       
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
       
        }else{
            try{
                $foldername=$request['folderName'];
                $path = storage_path().'/fileManager/'.date('Y').'/'.date('m').'/'. $foldername;
                $result=File::makeDirectory($path, 0777, true, true);
                   $fileData= new FileManager();
                   $fileData->user_id=auth()->user()->id;
                   $fileData->date_time=Carbon::now();
                   $fileData->size='0KB';
                   $fileData->name=$foldername;
                   $fileData->isDirectory=1;
                   $fileData->file_url=storage_path().'/fileManager/'.date('Y').'/'.date('m').'/'. $foldername;
                   $fileData->file_path=$path;
                   $fileData->type='dir';
                   $fileData->remember_token=Str::random(60);
                   $fileData->save();
                   return response()->json(["status" => $this->status_code,"message"=>"Folder Created Successfully", "data" =>$fileData]);
               }catch(Exception $e){
        
               }
        }
       
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function singleFileStore(Request $request)
    {
        //
        $validator =  Validator::make($request->all(),[
            'file' => 'required|max:20480',
        ]);

        if($validator->fails()) {
       
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
       
        }else{

            
           $files=$request->file;
                $originalName = $files->getClientOriginalName();
                $name =$originalName;
                $file_size = $files->getSize();
                $file_extension = $files->getClientOriginalExtension();
                $path=storage_path('uploads/'.date('Y').'/'.date('m'));
                $newPath=$path;
                $newName=$name;
                $checkPath=FileManager::where('user_id',auth()->user()->id)->where('file_path',$path)->get();
                if(count($checkPath)>0 || File::exists($path)){
                    $i=+1+count($checkPath);
                    $newName=$i.'-'.$name;
                }
           $files->move($newPath, $newName);     
           $fileData= new FileManager();
           $fileData->user_id=auth()->user()->id;
           $fileData->date_time=Carbon::now();
           $fileData->size=HumanReadable::bytesToHuman($file_size);
           $fileData->name=$newName;
           $fileData->file_url='/storage/uploads/'.date('Y').'/'.date('m').'/'.$newName;
           $fileData->file_path=$newPath;
           $fileData->type=$file_extension;
           $fileData->remember_token=Str::random(60);
           $fileData->save();
         return response()->json(["status" => $this->status_code,"message"=>"File Uploaded Successfully", "data" =>$fileData]);
                   
        }
    
}

    public function multipleFileStore(Request $request)
    {

        //
        $validator =  Validator::make($request->all(),[
            'files' => 'required|array|max:20480|min:1',
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }else{
            $array_push=array();
            foreach ($request->file('files') as $file) {

                
                $files= $file;                
                $name= $files->getClientOriginalName();
                $file_size = $files->getSize();
                $file_extension = $files->getClientOriginalExtension();
                $path=storage_path().'/uploads/'.date('Y').'/'.date('m');
                $newName=$name;
                $checkPath=FileManager::where('file_path',$path)->get();
                    if(count($checkPath)>0 || File::exists($path)){
                        $i=+1+count($checkPath);
                        $newName=$i.'-'.$name;
                    }
                $files->move($path, $newName);
                $fileData= new FileManager();
                $fileData->user_id=auth()->user()->id;
                $fileData->date_time=Carbon::now();
                $fileData->size=HumanReadable::bytesToHuman($file_size);
                $fileData->name=$newName;
                $fileData->file_url='/storage/uploads/'.date('Y').'/'.date('m').'/'.$newName;
                $fileData->file_path=$path;
                $fileData->type=$file_extension;
                $fileData->remember_token=Str::random(60);
                $fileData->save();
                $fileData['eventFileCost']="0";
                $fileData['eventFileCostType']='free';
                $fileData['eventFileDescription']='';
                $array_push[]=$fileData;
            } 
            return response()->json(["status" => $this->status_code,"message"=>"File Uploaded Successfully", "data" =>$array_push]);
        }


    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    public function  Duplicate(Request $request){

       
        $ResponseStore=[];
        foreach($request->eventId as $event){
            
            $File=FileManager::find($event);

            $FileManager =$File->replicate();
            
            $FileManager->save();   

            $FileManager->date_time=Carbon::now();   

            $FileManager->save();   

            $ResponseStore[]=$FileManager;
        }

        if(count($ResponseStore)>0){

            return response()->json(['status'=>$this->status_code,'message'=>'File Duplicate Successfully','data'=>$ResponseStore]); 
       
        }else{
            
            return response()->json(['status'=>'failed','message'=>'Data Not Found']); 
        
        }

    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function DeleteSingleFile(Request $request)
    {
        //

        $singleFile = FileManager::where('id', $request->EventId)->first();

        $EventFilePath =$singleFile->file_path;
            if (File::exists($EventFilePath)) {

                 File::delete($EventFilePath);
            }
        
       $eventId= FileManager::find($request->EventId)->softDelete();

       return response()->json(["status" => $this->status_code,"message"=>"File Deleted Successfully","data"=>$request->EventId]);

        
    }

    public function DeleteMultipleFile(Request $request){

        if(count($request->fileId)>0){
             $Delete=false;
             $filePaths=[];
            // return Event::whereJsonContains('event_files->id',$request->fileId)->get();
            //  if(Event::whereJsonContains('event_files->id',$request->fileId)->get()){

            //  }
            foreach($request->fileId as $fileId){

                $FileManager = FileManager::where('id',intval($fileId))->where('user_id',auth()->user()->id)->delete();
                $Delete=$FileManager;

                $singleFile = FileManager::find($fileId);

                // $EventFilePath =$singleFile->file_path.'/'.$singleFile->name;
                    
                // $filePaths[]=$EventFilePath;

            }
            if($Delete){
                try{

                    // File::delete($filePaths[0]);

                }catch(Exception $e){

                }

                return response()->json(['status'=>$this->status_code,'message'=>'File(s) deleted successfully','data'=>true]);

            }else{

                return response()->json(['status'=>'failed','message'=>'Something went wrong']);

            }
            
        
        }else{

            return response()->json(['status'=>'failed','message'=>'File not selected']);
        }
        

       

        return response()->json($request->fileId);

    }

   public function  DownloadFile(Request $request){
                $user = auth()->user();

                if (!$request->fileId) {
                    return response()->json(['status' => 'failed', 'message' => "please select file!"]);
                }

                $file = FileManager::find($request->fileId);

                if (!$file) {
                    return response()->json(['status' => 'failed', 'message' => "Sorry File Not Exist"]);
                }

                $eventFile = EventFile::where('file_manager_id', $file->id)->first();
                $paidUser = EventFilePayment::where('user_fk_id', $user->id)
                    ->where('event_file_fk_id', $request->fileId)
                    ->exists();
                $hostUser = FileManager::where('user_id', $user->id)
                    ->where('id', $request->fileId)
                    ->exists();

                if ($eventFile && !$paidUser && $eventFile->file_cost > 0 && !$hostUser) {
                    return response()->json(['status' => 'failed', 'message' => "you need to purchased the file "]);
                }

                $filePath = $file->file_path;
                $downloadName = $file->name;

                if (filter_var($filePath, FILTER_VALIDATE_URL)) {
                    $remoteFile = Http::get($filePath);

                    if (!$remoteFile->successful()) {
                        return response()->json(['status' => 'failed', 'message' => "Sorry File Not Exist"]);
                    }

                    return response($remoteFile->body(), 200, [
                        'Content-Type' => $remoteFile->header('Content-Type') ?: 'application/octet-stream',
                        'Content-Disposition' => 'attachment; filename="' . addslashes($downloadName) . '"',
                    ]);
                }

                $fullFilePath = rtrim($filePath, '/\\') . DIRECTORY_SEPARATOR . $downloadName;

                // Some older records may already store the complete file path.
                if (!File::exists($fullFilePath) && File::exists($filePath)) {
                    $fullFilePath = $filePath;
                }

                if (!File::exists($fullFilePath)) {
                    return response()->json(['status' => 'failed', 'message' => "Sorry File Not Exist"]);
                }

                return response()->download($fullFilePath, $downloadName, [
                    'Content-Type' => File::mimeType($fullFilePath) ?: 'application/octet-stream',
                ]);

    } 
    public function RenameFile(Request $request)
        {
            $user=auth()->user();
            if($request->fileId){
             $file=FileManager::where('id',$request->fileId)->where('user_id',$user->id)->first();
            if(File::exists($file->file_path.'/'.$request->name)){
                return response()->json(['status'=>'failed' ,'message'=>"file name already exist"]);
            }else{
                if(File::exists($file->file_path.'/'.$file->name)){
                    $copy= File::copy($file->file_path.'/'.$file->name,$file->file_path.'/'.$request->name.'.'.$file->type);
                    if($copy){
                       $file=FileManager::where('id',$request->fileId)->where('user_id',$user->id)->update([
                           "name"=>$request->name.'.'.$file->type,
                        ]);
                    }
                    return  response()->json(['status'=>$this->status_code,'message'=>'File Renamed','data'=>$file]);
   
               }else{
                   return response()->json(['status'=>'failed' ,'message'=>"Sorry File Not Exist"]);
   
               }
            }
            }else{
                return response()->json(['status'=>'failed' ,'message'=>"please select file!"]);
            }

            return response()->json($request->all());
        }
    public function MoveFile()
        {

            return response()->json(["Move File"]);

        }
    public function FileFilter()
        {
                return "File Filter";
        }
    public function SearchFile(){
        
        return "query";
    
    }  

}
