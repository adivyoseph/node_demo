var request = require('axios');

module.exports =  {
    index: function(req, res) {
            request.post('http://localhost:10003/list_id_tenants')
            .then(function(response) {
                console.log(response.data);
                var tenantRequests = new Array();
                for (let i = 0; i < response.data.length; i++) {
                    var tenant_id = response.data[i].tenant_id;
                    request.post('http://localhost:10003/gettenant', {tenant_id: tenant_id})
                    
                    .then(function(response_a) {
                        console.log(response_a.data);

                        tenantRequests[i] = response_a.data;


                    })
                    .catch(function(error) {
                        console.log(error);
                        //todo tell user
                    });

                }

                console.log(tenantRequests);

            })
            .catch(function(error) {
                console.log(error);
                //todo tell user
            });
    }

};
