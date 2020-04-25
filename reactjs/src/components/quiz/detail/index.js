import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link as RRLink } from 'react-router-dom';
import Link from '../../link';
import styles from '../../styles.module.css';
import QuizContainer from '../../../containers/quiz';

class QuizDetail extends React.Component {
    componentDidMount() {
        // get the id from the route params
        const { fetchQuiz, match: { params: { quizId } } } = this.props;
        fetchQuiz(quizId);
    }   
    
    delete = async () => {
        const { deleteQuiz, quiz: { id } } = this.props;
        await deleteQuiz(id);
    }
      
    render() {
        const { quiz, questions } = this.props;
        return(
            <React.Fragment>
                <h1 className={styles.heading}>{quiz.name}
                    <Link url={`/admin/quizzes/${quiz.id}`}/>
                    <Link url={`/admin/quizzes/edit/${quiz.id}`} title='Edit' iconn='fa-edit'/>
                    <span onClick={this.delete} role="presentation">
                        <Link url={`/admin/quizzes/delete/`} title='Delete' icon='fa-trash' className='linkSecondary'/>
                    </span>
                </h1>
                <h2 className={styles.headingSecondary}>Questions</h2>
                <ul className={styles.list}></ul>
                    {questions.map(question => (
                        <li className={styles.list__item} key={question.id}>
                            <span className={styles.list__item__title}>{question.title}</span>
                            <Link url={`/admin/questions/${question.id}`}/>
                        </li>
                    ))}
                <RRLink to={`/admin/questions/new?quizId=${quiz.id}`} className='button active'>Add a new question</RRLink>
            </React.Fragment>
        );
    }
}

QuizDetail.propTypes = {
  quiz: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }),
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuiz: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
};

QuizDetail.defaultProps = {
  quiz: {},
  questions: [],
};

export default QuizContainer(QuizDetail);