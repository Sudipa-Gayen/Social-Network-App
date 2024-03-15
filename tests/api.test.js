import('chai').then(mod => {
    const chai = mod.default;
    const chaiHttp = mod.default;
    const expect = chai.expect;
    chai.use(chaiHttp);
  
    describe('API Endpoints', () => {
      it('should register a new user', async () => {
        const res = await chai
          .request('http://localhost:3000') 
          .post('/api/users')
          .send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
          });
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
      });
  
      // Test case for the login endpoint
      it('should log in an existing user', async () => {
        const res = await chai
          .request('http://localhost:3000')
          .post('/api/login')
          .send({
            email: 'testuser@example.com',
            password: 'testpassword',
          });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
      });

      it('should create a new post', async () => {
        const res = await chai
          .request('http://localhost:3000') 
          .post('/api/posts')
          .send({
            title: 'Test Post',
            content: 'This is a test post content.',
            userId: 'userId',
          });
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('postId');
      });
  
      it('should follow another user', async () => {
        const res = await chai
          .request('http://localhost:3000')
          .post('/api/follow')
          .send({
            followerId: 'followerId',
            followingId: 'followingId',
          });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User followed successfully');
      });

      it('should get all posts of a user', async () => {
        const res = await chai
          .request('http://localhost:3000')
          .get('/api/posts/user/:userId')
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  
      // Add more test cases for other endpoints here
    });
  });
  