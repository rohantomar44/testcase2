import {TestBed, async , inject} from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from 'app.service';
import { Data } from 'interface';



describe('DataService', ()=>{
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[DataService]
        })
    }));

    it('should be created', inject([HttpTestingController,DataService ],(httpMock:HttpTestingController, service :DataService)=>{
        service.getData().subscribe((value: string | any[]) =>{
            const data : Data []=[
                {id:11, 
             name : 'eleven'}
            ];

            expect(value.length).toBe(1);
            expect(value).toEqual(data)
        })

        const data : Data []=[
            {id:1,
         name : 'one'}
        ];

        const req =httpMock.expectOne('http://localhost:3000/data');
        expect (req.request.method).toEqual('GET');
        req.flush(data);
    }))
    afterEach(inject([HttpTestingController],(httpMock: HttpTestingController)=> {
        httpMock.verify();
    }))
    
        
    })
