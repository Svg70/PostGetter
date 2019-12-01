import React from 'react'
import styles from './post.module.css'
const Post = (props) => {
    let zeroMake = (e) => {
        if (String(e).length === 1) { return '0' + e } else return e
    }
    let b = new Date(props.created_at)
    let dateOfPublishing = zeroMake(new Date(b).getDay()) + '/' + zeroMake((Number(new Date(b).getMonth()) + 1)) + '/' + zeroMake(new Date(b).getFullYear()) + ' ' +
        zeroMake(new Date(b).getHours()) + ':' + zeroMake(new Date(b).getMinutes())


    return <div className={styles.postWrapper}>
        <div className={styles.postDate}>Date of post: {dateOfPublishing}</div>
        <div classneme={styles.authorName}>Authors Id: {props.id}</div>
        <div className={styles.post}>Post text: {props.text}</div>
    </div>
}
export default Post