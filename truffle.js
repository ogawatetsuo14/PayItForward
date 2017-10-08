module.exports = {
  networks: {
    development: {
      host: "52.230.18.254",
      port: 22000,
      network_id: "*" // Match any network id
    },
    nodefour:  {
      host: "52.230.18.254",
      port: 22003,
      network_id: "*" // Match any network id
    },
    nodeseven:  {
      host: "52.230.18.254",
      port: 22006,
      network_id: "*" // Match any network id
    }
  }
};
