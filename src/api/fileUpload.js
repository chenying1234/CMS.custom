import fetch from '@/utils/fetch';

export function fileUpload(data){
    return fetch({
        url: '/api/Contract/UploadFiles',
        method: 'post',
        data
    })
}
