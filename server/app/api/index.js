/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

api.scrap = function(req, res) {

   console.log(req);
   res.status(200).json("PDF received");
};

module.exports = api;