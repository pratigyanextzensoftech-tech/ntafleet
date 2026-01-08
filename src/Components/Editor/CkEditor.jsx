import { CKEditorExample } from '../../Constant';
import React, { Fragment, useState } from 'react';
import CKEditors from 'react-ckeditor-component';

const CkEditorContain = ({ value, onChange }) => {
    
    return (
        <Fragment>
            
                                <CKEditors
                                    activeclassName="p10"
                                    content={value}
                                    events={{
        change: (evt) => {
          const data = evt.editor.getData();
          onChange(data); // 🔥 send data to react-hook-form
        },
      }}
                                />
                        
               
        </Fragment>
    );
};
export default CkEditorContain;