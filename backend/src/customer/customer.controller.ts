import {
    Controller,
    Get,
    Res,
    Req,
    HttpStatus,
    Post,
    Body,
    Put,
    Query,
    NotFoundException,
    Delete,
    Param,
    UsePipes, UseFilters, UseGuards,
    Request, UseInterceptors, ClassSerializerInterceptor,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import {CustomerPipe} from '../pipes/customer.pipe';
import {HttpExceptionFilter} from '../filters/http-exception.filter';
// import {AuthGuard} from '../guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import {Roles} from '../decorators/roles.decorator';
import {RolesGuard} from '../guards/roles.guard';
import {ApiBasicAuth, ApiBearerAuth, ApiHeader} from '@nestjs/swagger';
import {ApiImplicitParam} from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiBearerAuth()
@Controller('customer')
@UseGuards(AuthGuard('jwt'))
@UseFilters(HttpExceptionFilter)
// @UseGuards(RolesGuard)
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    // Retrieve customers list
    @Get('customers')
    @ApiImplicitQuery({ name: 'limit' })
    @ApiImplicitQuery({ name: 'offset'})
    @ApiImplicitQuery({ name: 'filter'})
    async getAllCustomer(@Request() req, @Query() query) {
        const customers = await this.customerService.getAllCustomer(req.user._id, query);
        // return res.status(HttpStatus.OK).json(customers);
        return customers;
    }

    // Fetch a particular customer using ID
    @Get('customer/:customerID')
    @ApiImplicitParam({ name: 'customerID' })
    async getCustomer(@Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return customer;
    }

    // add a customer
    @Post('/create')
    @UsePipes(new CustomerPipe())
    async addCustomer(@Req() req, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customerService.addCustomer({...createCustomerDTO, user: req.user._id});
        return {message: 'Customer has been successfully created'};
    }

    // Update a customer's details
    @Put('/update')
    @ApiImplicitQuery({ name: 'customerID' })
    async updateCustomer(@Query('customerID') customerID, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customerService.updateCustomer(customerID, createCustomerDTO);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return {message: 'Customer has been successfully updated'};
    }

    // Delete a customer
    @Delete('/delete')
    async deleteCustomer(@Query('customerID') customerID) {
        const customer = await this.customerService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return {message: 'Customer has been deleted'};
    }
}
