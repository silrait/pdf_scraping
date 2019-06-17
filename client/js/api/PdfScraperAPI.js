class PdfScraperAPI {
    constructor(){
        this._url = 'http://localhost';
        this._port = ':3000';
    }

    async scrape({binary, options}) {
      return new Promise( (resolve, reject) => {
        console.log(options);
        const formData = new FormData();
        formData.append('file', binary);
        formData.append('options', options);
        
        axios({
          method: 'post',
          url: this._url + this._port + '/pdfscraper',
          responseType: 'blob',
          headers: {'Content-Type': 'multipart/form-data' },
          // headers: {'Content-Type': 'application/pdf' },            
          data: formData,
        }).then(
          response => {
            resolve(response.data)
          }
        ).catch (error => {
          reject(error);
        })
      });
    }
}
