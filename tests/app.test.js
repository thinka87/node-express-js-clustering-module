const request = require('supertest')
jest.setTimeout(60000)

describe('http client api', () => {
    const api = request('http://172.23.32.1:3030/sendNotifications')
    
    it('returns 200 with correct parameters', (done)=>{
       api.get('?url=http://localhost:3001/receiver&message=1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .then(response => {
          done();
        })
        .catch(err => done(err))   
    })
    it('returns 400 with incorrect parameters ', (done)=>{
      api.get('?url=http:/localhost:3001/receiver&message=1')
       .expect(400)
       .expect('Content-Type', 'application/json; charset=utf-8')
       .then(response => {
         done();
       })
       .catch(err => done(err))   
   })  
   it('returns 403 with incorrect url ', (done)=>{
    api.get('?url=http://localhost:3002/receiver&message=1')
     .expect(403)
     .expect('Content-Type', 'application/json; charset=utf-8')
     .then(response => {
       done();
     })
     .catch(err => done(err))   
  }) 
})


