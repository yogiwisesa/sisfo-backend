'use strict'
const Database = use('Database')

class KaryawanController {

    async postLogin({request}){
        let {username, password} = request.all()
        let account = await Database.select('*').from('karyawan').where({'username': username, 'password': password})
        if (account.length > 0){
            return {
                message: 'ok',
                account
            }
        } else {
            return {
                message: 'User not found'
            }
        }
    }

    async postJadwal({request}) {
        let {id} = request.only(['id'])
        let data = await Database.select('*').from('TableJadwal').where('id_karyawan', id)
        if (data.length > 0){
            return {
                message: 'ok',
                data
            }
        } else {
            return {
                message: `user's id not found`
            }
        }  
    }

    async postRequestTukar({request}){
         let {idjadwal1, idjadwal2} = request.only(['idjadwal1', 'idjadwal2'])
         let data = await Database.table('TabelTukar').insert({ 
             id_jadwal1: idjadwal1,
             id_jadwal2: idjadwal2,
             status: 'Belum dikonfirmasi'
         })

         return data
    }

    async getSemuaKaryawan(){
        let data = await Database.select('*').from('karyawan')
        if (data.length > 0) {
            return {
                message: 'ok',
                data
            }
        } else {
            return {
                message: 'null'
            }
        }
    }

    async getSemuaJadwal() {
        let data = await Database.select('*').from('TableJadwal')
        if (data.length > 0) {
            return {
                message: 'ok',
                data
            }
        } else {
            return {
                message: 'null'
            }
        }
    }
}

module.exports = KaryawanController
