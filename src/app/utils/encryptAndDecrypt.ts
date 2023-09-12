import CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

const key = environment.PASS_ENCRYPT;

const encrypt = ( data: Object | string ): string => {
    
    if( data instanceof Object ){
        return CryptoJS.AES.encrypt( JSON.stringify(data), key ).toString();
    }else{
        return CryptoJS.AES.encrypt( data, key ).toString();
    }

}

const decrypt = ( data: string ) => {
    const bytes = CryptoJS.AES.decrypt( data, key );
    const data_string = bytes.toString( CryptoJS.enc.Utf8 )

    //comprobar si la data es un objeto
    if( data_string.indexOf( "{", 0 ) != -1 && data_string.indexOf( "}", data_string.length -1 ) != -1 
        && data_string.indexOf(":") != -1 && data_string.lastIndexOf('"', 1) != -1 ){

        return JSON.parse( data_string );
    }else{
        
        return data_string;
    }
}  

export default { encrypt, decrypt };