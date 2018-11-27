package controller;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;






/**
 * 异步上传处理
 * @param request
 * @param response
 * @param file
 * @return 返回上传文件相对路径及名称
 * @throws IOException
 */
@Controller
@RequestMapping("upload")
public class uploadController {
	
	//上传  
	@RequestMapping(value = "/uploadFiless", method =RequestMethod.POST)
	@ResponseBody
	public boolean uploadFiless(@RequestParam("data") MultipartFile data, @RequestParam("filename")String filename, @RequestParam("name")String name) {
		System.out.println(data+"   **   "+filename);
		String fileServerPath="/hpc/hpcapp/daicy/ceshi";
		//直接上传到服务器，中文不转码
		File targetFile = new File(fileServerPath, filename);
		try {  
			data.transferTo(targetFile);
			hebinfile(filename,name);
			return true;
		} catch (IllegalStateException e) {
			return false;
		} catch (IOException e) {
			return false;
		}
	}
	
	
	
	/** 
     * 合并文件 
     * @param sName 
     * @param splitternum 
     */  
	@RequestMapping(value = "/hebinfile", method =RequestMethod.POST)
	@ResponseBody
    private void hebinfile( String sName,String name){ //sName是每个50m的文件名称        name是要上传的大文件的原名称
		try {
			RandomAccessFile saveinput = new RandomAccessFile("/hpc/hpcapp/daicy/ceshi"+"/"+name,"rw");
			String fielpath="/hpc/hpcapp/daicy/ceshi"+"/"+sName;
			RandomAccessFile input = new RandomAccessFile (new File(fielpath),"r"); //读取每一个50m的文件
			 byte[] b = new byte[1024]; 
			 int nRead;
			 while ((nRead = input.read(b, 0, 1024)) > 0) {  
               write(saveinput,b, 0, nRead);  
           }  
           input.close();  
           File file = new File(fielpath);  
           if(file.exists()){  
               file.delete();  
           } 
		} catch (Exception e) {
			e.printStackTrace();
		}
    }  
 
    /** 
     * 写文件 
     * @param b 
     * @param nStart 
     * @param nLen 
     * @return 
     */  
    private int write(RandomAccessFile oSavedFile,byte[] b, int nStart, int nLen) {  
        int n = -1;  
        try {  
            oSavedFile.seek(oSavedFile.length());  
            oSavedFile.write(b, nStart, nLen);  
            n = nLen;  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return n;  
    }  
}
