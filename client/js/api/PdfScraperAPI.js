class PdfScraperAPI {
    constructor(){
        this._url = 'http://localhost';
        this._port = ':3000';
    }

    async apiAxiosTest(binary) {
        console.log('apiAxiosTest');
        console.log(binary);
        const formData = new FormData();
        formData.append('file', binary);
        formData.append('opt', 'ola');

        
        try {
          //const response = await axios.get(this._url + this._port + '/pdfscraper');
          const response = await axios({
            method: 'post',
            url: this._url + this._port + '/pdfscraper',
            headers: {'Content-Type': 'multipart/form-data' },
            // headers: {'Content-Type': 'application/pdf' },            
            data: formData,
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
}
