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
             status: 'Waiting for confirmation'
         })

        return {
            message: 'ok',
            data
        } 
    }

    async getSemuaKaryawan(){
        let account = await Database.select('*').from('karyawan')
        if (account.length > 0) {
            return {
                message: 'ok',
                account
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

    async getListRequestBy({request}){

        // select * from TabelTukar WHERE id_jadwal1 in (select id_jadwal FROM TableJadwal WHERE id_karyawan = 1)
        let {id_karyawan} = request.all();
        console.log(id_karyawan);
        let data = await Database.select('*').from('TabelTukar').whereIn('id_jadwal1', Database.select('id_jadwal').from('TableJadwal').where('id_karyawan', id_karyawan));
        if (data.length > 0){
            return {
                message: 'ok',
                data
            }
        } else {
            return {
                message:'null'
            }
        }
    }

    async deleteTukarJadwal({request}){
        let { id_jadwal } = request.all();
        //let data = await Database.updated.from('TabelTukar').where('id_jadwal', id_jadwal)
        let data = await Database.from('TabelTukar').where('id_tukar', id_jadwal).update({
            status: 'Cancelled'
        })
        return {
            message: 'ok',
            data
        }
    }
}


module.exports = KaryawanController
