class Proxy {
  constructor() {
    this._apiBase = process.env.REACT_APP_API_URL;
  }
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if(res.status === 403){
        localStorage.removeItem("user_info");
        window.location.assign("/login");
      }
      //throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getResourceWithoutToken = async (url) => {
    const res =  await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    return await res.json();
  }

  postResource = async (url, data) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST", 
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      if(res.status === 403){
        localStorage.removeItem("user_info");
        window.location.assign("/login");
      }
    }
    return await res.json();
  }

  changeBalance(nick, amount) {
    return this.postResource(`admin/change_balance?nickname=${nick}&amount=${amount}`)
  }
  
  upgradeBalance(nick, amount) {
    return this.postResource(`admin/send_check?nickname=${nick}&amount=${amount}`)
  }

  getUserPayment(nick){
    return this.getResource(`admin/user_pays?nickname=${nick}`)
  }

  getUserReplenishment(nick){
    return this.getResource(`admin/user_payments?nickname=${nick}`)
  }

  getAllPayments(){
    return this.getResource(`admin/all_payments`)
  }

  getInfoForSite() {
    return this.getResource(`pays/all_statistics`)
  }

  historyProxy() {
    return this.getResource(`pays/userPay`);
  }

  resellProxy(ip) {
    return this.getResource(`base/rent/${ip}`);
  }

  prolong(ip){
    return this.getResource(`base/prolong?ip=${ip}`);
  }

  buyProxy(id) {
    return this.getResource(`base/buy/${id}`);
  }

  getLand(continent = "asia") {
    return this.getResource(`base/regions?continent=${continent}`);
  }

  getCrypto = (sum) => {
    return this.getResource(`merchant/create_crypto_pay?amount_fiat=${sum}`);
  };

  getCard = (sum, land) => {
    return this.getResource(
      `merchant/create_zver_pay?amount_fiat=${sum}&type=${land}`
    );
  };

  getQiwi = (sum, land) => {
    return this.getResource(
      `merchant/create_freekassa_pay?amount_fiat=${sum}&type=${land}`
    );
  };

  getVerifiZver = (invoice) => {
    return this.getResource(`merchant/check_zver_pay?invoise=${invoice}`);
  };

  getVerifiFree = (invoice) => {
    return this.getResource(`merchant/check_freekassa_pay?invoise=${invoice}`);
  };

  getContinent(
    continent,
    socks_type_id = "all",
    blacklisted_search = "all",
    city = "all",
    zip_city = "all",
    region = "all"
  ) {
    return this.getResource(
      `base/search?continent=${continent}&socks_type_id=${socks_type_id}&blacklisted_search=${blacklisted_search}&real_ip=all&domain=all&city=${city}&zip_city=${zip_city}&region=${region}`
    );
  }

  getAllUsers = (limit = 4000, skip = 0) => {
    return this.getResource(`users/?limit=${limit}&skip=${skip}`)
  }
}

export default Proxy;
