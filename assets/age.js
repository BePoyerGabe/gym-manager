module.exports = {
    age: function(timestamp) {
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
       const today = new Date()
       const birthday = new Date(timestamp)

       let age = today.getFullYear() - birthday.getFullYear()
       const month = today.getMonth() - birthday.getMonth()

       //verifica se ainda não fez
       if(month < 0 || (month == 0 && today.getDate() - birthday.getDate())) {
           age -= 1
       }

       return age
    }
}