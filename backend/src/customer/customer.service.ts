import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../types/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

    // @ts-ignore
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

    // fetch all customers
    async getAllCustomer(userID, query): Promise<{list: Customer[], count: number, limit: number, offset: number}> {
        const count = await this.customerModel.find({user: userID}).count().exec();
        const limit = parseInt(query.limit, 10);
        const offset = parseInt(query.offset, 10) * limit;
        const filterOptions = query.filter ? {user: userID, first_name: new RegExp(query.filter)} : {user: userID};
        const customers = await this.customerModel.find(filterOptions).limit(limit).skip(offset).exec();
        return {
            list: customers,
            count,
            limit,
            offset,
        };
    }

    // Get a single customer
    async getCustomer(customerID): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID).exec();
        return customer;
    }

    // post a single customer
    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = await this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }

    // Edit customer details
    async updateCustomer(customerID, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel
            .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }

    // Delete a customer
    async deleteCustomer(customerID): Promise<any> {
        const deletedCustomer = await this.customerModel.findByIdAndRemove(customerID);
        return deletedCustomer;
    }

}
