import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { LANGUAGES } from './Lang'
import './ProjectTag.css'

const suggestions = LANGUAGES.map((language) => {
    return {
        id: language,
        text: language
    }
})

const KeyCodes = {
    comma: 188,
    enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ProjectTag extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        tags: [

        ],
        suggestios: suggestions,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag]}));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        this.setState({tags: newTags});
    }

    handleTagClick(index) {
        console.log(index);
    }

    render() {
        const {tags, suggestios} = this.state;
        return (
            <div>
                <ReactTags
                    tags={tags}
                    suggestions={suggestios}
                    delimiters={delimiters}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
            </div>
        )
    }

}

export default ProjectTag