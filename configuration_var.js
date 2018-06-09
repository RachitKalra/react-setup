
const PORT = process.env.PORT || '80';
const SSL_PORT = process.env.PORT_SSL || '443';
const ADDRESS = process.env.ADDRESS || "::" ;

module.exports = {
    port:PORT,
    ssl_port:SSL_PORT,
    address:ADDRESS
};
