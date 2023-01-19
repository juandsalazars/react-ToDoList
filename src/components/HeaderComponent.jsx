import React from 'react';

export default function Header(){
    return(
        <div className='container row-header mb-2'>
            <div className="row row-header">
                <h1 className='col-12 text-center'>Your ToDo List</h1>
                <p className='col-12'>
                    Here your can create your own ToDo list, adding new tasks,
                    choosing their priority, and their deadline.

                    You can also modify an already created task and can 
                    delete it before or after completion.
                </p>
            </div>
        </div>
    );
}