import React from 'react'
import styles from './postList.module.css'
import Post from '../post/post'
import Loader from '../../Loader/loader'
import { connect } from 'react-redux';
import { getDataThunk, updateDataThunk } from '../../redux/post-reducer'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../Forms/utils/validator'
import { Input } from '../../Forms/common/formControlls'



class PostList extends React.Component {


    componentDidMount() {
        // if(this.state.inputLinkValue !== null && this.state.numberOfPosts!== null && this.state.veliocityOfChange!== null)  
        this.runInterval()


    }

    runInterval = ()=>{
        this.setState({interval: setInterval(
            () => this.props.updateDataThunk(this.state), 1000 *Number(this.props.postPage.veliocityOfChange)
            )})
    }
    state = {
        inputLinkValue: null,
        numberOfPosts: null,
        veliocityOfChange: null,
        interval: null
    }

    componentDidUpdate =(prevProps, prevState)=>{
        if(prevProps.postPage.veliocityOfChange !== this.props.postPage.veliocityOfChange){
        this.runInterval()}
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setDataToLocalState = (values) => {

        clearInterval(this.state.interval)

        this.setState({
            inputLinkValue: values.inputLinkValue,
            numberOfPosts: values.numberOfPosts,
            veliocityOfChange: values.veliocityOfChange
        })
        this.props.getDataThunk(values.inputLinkValue, values.numberOfPosts, values.veliocityOfChange)
        
    }


    render() {

        let postArray = this.props.postPage.data.slice(0, this.props.postPage.numberOfPosts).map(p =>
            <Post key={p.id} created_at={p.created_at
            } id={p.id} text={p.text} />)

        return <div className={styles.postListWrapper}>
            <div className={styles.postListForm}>
                <PostReduxForm onSubmit={this.setDataToLocalState} 
                inputLinkValue={this.props.postPage.inputLinkValue} />
            </div>
            {this.props.postPage.isLoading ?
                <Loader /> :
                <div className={styles.postListWrapper}>
                    {(!this.props.postPage.gettingDataMistake) ?
                        this.props.postPage.data.length === 0 ? 'Nothing to show. Please, fill the form above to get posts' : postArray :
                        'Get data mistake.Please, fill the form above to get posts'}
                </div>}
        </div>

    }
}

let maxLength50 = maxLengthCreator(100)
const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                Put your Feed URL, API with suitable format of data: http://api.massrelevance.com/MassRelDemo/kindle.json
                <Field component={Input} name="inputLinkValue"
                    placeholder="inputLinkValue"
                    validate={[required, maxLength50]}
                />
                How many posts you want to load?:
                <Field component={Input} name="numberOfPosts"
                    placeholder="numberOfPosts"
                    validate={[required, maxLength50]}
                />
                Determine the Update interval(seconds)

                    <Field component={Input} name="veliocityOfChange"
                    placeholder="veliocityOfChange"
                    validate={[required, maxLength50]}
                />


                <button className={styles.btn}>GeT Posts!</button>

            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({
    form: 'getDataForm'
})(AddPostForm)





const mapStateToProps = (state) => {
    return {
        postPage: state.postPage
    }
}


const PostListContainer = connect(mapStateToProps, { getDataThunk, updateDataThunk })(PostList)




export default PostListContainer


