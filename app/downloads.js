
module.exports = (app) =>{
  const dirPath = "uploads/MCU";
  const dirVideos = dirPath + "/" + "Videos";
  const dirExcels = dirPath + "/" + "Excels";

  app.get('/downloadVideo', function(req, res){
      res.download('uploads/MCU/Videos/26.02.2021-14.08.35.mp4', '26.02.2021-14.08.35.mp4');
  });
  
  app.get('/downloadExcel', function(req, res){
  	  res.download('uploads/MCU/Excels/26.02.2021-14.08.35.xlsx', '26.02.2021-14.08.35.xlsx');
  })
}