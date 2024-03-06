import { action } from '@storybook/addon-actions'
import DocumentReviewForm from './DocumentReviewForm'
import type { RegisterDocument } from '../model'
import '../index.css'

export default {
  title: 'Forms/DocumentReviewForm',
  component: DocumentReviewForm,
  decorators: [
    (storyFn: () => JSX.Element) => (
      <div
        className="border border-gray border-solid m-4 p-4"
        style={{ width: 'calc(400px + 4rem)' }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

const docsToBeReviewed: RegisterDocument[] = [
  { formatted: '', id: 0, name: 'Foo', required: true },
  { formatted: '', id: 1, name: 'Bar', required: true },
  { formatted: '', id: 2, name: 'Baz', required: false },
]

export const defaultView: React.FC = () => (
  <DocumentReviewForm
    docsToBeReviewed={docsToBeReviewed}
    onReview={(status) => Promise.resolve(action('review')(status))}
  />
)
