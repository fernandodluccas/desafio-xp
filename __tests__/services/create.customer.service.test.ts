import prisma from '../../src/prisma/prismaClient';
import { expect } from 'chai';
import { describe } from 'mocha';
import createCustomerService from '../../src/services/create.customer.service';
import sinon from 'sinon';

describe('create.customer.service', () => {
  let response;
  let create: sinon.SinonStub;
  let findFirst: sinon.SinonStub;

  before(() => {
    create = sinon.stub(prisma.customer, 'create').resolves({ id: '1' } as any);
    findFirst = sinon.stub(prisma.customer, 'findFirst').resolves({} as any);
  });

  afterEach(() => {
    create.reset();
    findFirst.reset();
  });

  it('should create a new customer', async () => {
    create.resolves({
      id: '1',
    });

    findFirst.resolves([{}]);

    response = await createCustomerService.prototype.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
    });

    expect(response).to.have.property('id');

    expect(create.calledOnce).to.be.true;
  });
});
