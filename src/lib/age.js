module.exports = {
  age(timestamp) {
    /*Lógica/
        2021 - 1999 = 22

        mes
        04 - 02 = 2
        04 - 04 = 0
        01 - 10 = -6 
        
        dia 
        15 - 12 = 3
        15 - 15 = 0
        15 - 31 = -16
        */
    const today = new Date();
    const birthday = new Date(timestamp);

    let age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();

    //verifica se ainda não fez
    if (month < 0 || (month == 0 && today.getDate() - birthday.getDate())) {
      age -= 1;
    }

    return age;
  },

  //método de um obj tbm pode ser escrita assim:
  fullbirthday(timestamp) {
    const birthday = new Date(timestamp);

    const year = birthday.getFullYear();

    //slice remove 0 á esquerda quando mês tiver 2 digitos
    const month = `0${birthday.getUTCMonth() + 1}`.slice(-2);

    const day = `0${birthday.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      memberShow: `${day}/${month}`,
    };
  },
};
