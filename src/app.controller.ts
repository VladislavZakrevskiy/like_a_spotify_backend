import {Controller, Get} from '@nestjs/common'

@Controller('/api')
export class AppController {

    @Get('/user')
    getUsers() {
        
    }

}