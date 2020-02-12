// TODO
// import http from "@/lib/http";

export default {
  isLogin() {
    return !!this.getToken()
  },

  getToken() {
    return sessionStorage.getItem("-_token_-")
  },

  async login(username, password) {
    // TODO

    sessionStorage.setItem("-_token_-", 'test_token');
    sessionStorage.setItem("-_username_-", 'admin');
    console.log(username, password)
    return true
    // let params = {
    //   username,
    //   password
    // };
    //
    // return await axios.post("/api/token", params)
    //     .then(function (res) {
    //       if (res.success) {
    //         console.log('res.data %o ', res.data);
    //         sessionStorage.setItem("-_token_-", res.data);
    //       }
    //       return res;
    //     });



  },
  async logout () {
    return true
    // let data = await axios.get("/api/logout");
    //
    // sessionStorage.removeItem('-_token_-');
    // sessionStorage.removeItem('-_username_-');
    // sessionStorage.removeItem('-_role_-');
    //
    // return data.success;
  }
}
