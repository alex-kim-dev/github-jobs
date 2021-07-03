import IconFilter from '@assets/icons/icon-filter.svg';
import IconLocation from '@assets/icons/icon-location.svg';
import IconSearch from '@assets/icons/icon-search.svg';
import { Button, Checkbox, TextField } from '@components/controls';
import { Container } from '@components/layout';
import * as statuses from '@constants/statuses';
import { hexToRgba, makeSearchQuery } from '@helpers';
import { useBreakpoint } from '@hooks';
import { fetchJobList, saveSearchParams } from '@store/jobsList/jobList.slice';
import { bool } from 'prop-types';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

ReactModal.setAppElement('#root');

const useSearchStyles = createUseStyles(
  ({ colors: c, breakpoints: { smUp, mdUp } }) => ({
    filter: {
      padding: '1.6rem 0',
    },

    form: {
      backgroundColor: c.back,
      borderRadius: '0.6rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      overflow: 'hidden',

      [smUp]: {
        gridTemplateColumns: [
          'minmax(0, 46.3rem)',
          'min-content',
          'minmax(0, 30rem)',
          'min-content',
          'min-content',
          'auto',
        ].join(' '),
      },
    },

    description: {
      padding: '1.6rem 1rem 1.6rem 1.6rem',

      [smUp]: {
        paddingLeft: '2.4rem',
        paddingRight: '2.4rem',
      },

      [mdUp]: {
        paddingLeft: '3.2rem',
        paddingRight: '3.2rem',
      },
    },

    location: {
      padding: '1.6rem 2.4rem',
    },

    fullTime: {
      [smUp]: {
        padding: '1.6rem 1.8rem 1.6rem 2rem',
      },

      [mdUp]: {
        paddingLeft: '3.2rem',
        paddingRight: '1.6rem',
      },
    },

    submit: {
      padding: '1.6rem 1.6rem 1.6rem 1rem',
    },

    overlay: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      padding: '2.4rem',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 10,
    },

    modal: {
      backgroundColor: c.back,
      borderRadius: '0.6rem',
      width: '100%',
    },

    modalBody: {
      padding: '1.2rem 2.4rem 2.4rem',

      '& > * + *': {
        marginTop: '1.2rem',
      },
    },
  }),
);

const useSeparatorStyles = createUseStyles(({ colors: c }) => ({
  separator: ({ vertical }) => ({
    backgroundColor: hexToRgba(c.textAlt, 0.2),
    height: vertical ? '100%' : '0.1rem',
    width: vertical ? '0.1rem' : '100%',
  }),
}));

const Separator = ({ vertical = false }) => {
  const css = useSeparatorStyles({ vertical });

  return <div className={css.separator} />;
};

Separator.propTypes = {
  vertical: bool,
};

const SearchForm = () => {
  const css = useSearchStyles();
  const isSmUp = useBreakpoint('smUp');
  const isMdUp = useBreakpoint('mdUp');
  const dispatch = useDispatch();
  const history = useHistory();
  const jobListStatus = useSelector((state) => state.jobList.status);
  const loading = jobListStatus === statuses.LOADING;
  const search = useSelector((state) => state.jobList.params);

  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isFullTime, setFullTime] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setDescription(search.description);
    setLocation(search.location);
    setFullTime(search.isFullTime);
  }, [search]);

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleLocationChange = ({ target: { value } }) => {
    setLocation(value);
  };

  const handleFullTimeChange = ({ target: { checked } }) => {
    setFullTime(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const searchParams = { description, location, isFullTime };
    dispatch(saveSearchParams(searchParams));
    dispatch(fetchJobList(searchParams));

    const query = makeSearchQuery(searchParams);
    history.push(`/?${query}`);
  };

  const extendedSearch = (
    <>
      <Separator vertical />
      <div className={css.location}>
        <TextField
          label='location'
          placeholder='Filter by location…'
          icon={<IconLocation />}
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <Separator vertical />
      <div className={css.fullTime}>
        <Checkbox
          label={`Full Time${isMdUp ? ' Only' : ''}`}
          checked={isFullTime}
          onChange={handleFullTimeChange}
        />
      </div>
      <div className={css.submit}>
        <Button type='submit' fullWidth loading={loading}>
          Search
        </Button>
      </div>
    </>
  );

  const compactSearch = (
    <>
      <div className={css.filter}>
        <Button
          type='button'
          variant='neutral'
          onClick={() => setModalOpen(true)}
        >
          <IconFilter />
        </Button>
      </div>
      <div className={css.submit}>
        <Button type='submit' loading={loading}>
          <IconSearch viewBox='0 0 24 24' width='20' height='20' />
        </Button>
      </div>
    </>
  );

  const modal = (
    <ReactModal
      isOpen={!isSmUp && isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel='Additional search filters'
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.location}>
        <TextField
          label='location'
          placeholder='Filter by location…'
          icon={<IconLocation />}
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <Separator />
      <div className={css.modalBody}>
        <Checkbox
          label='Full Time Only'
          checked={isFullTime}
          onChange={handleFullTimeChange}
        />
        <Button
          type='submit'
          fullWidth
          form='searchForm'
          onClick={() => setModalOpen(false)}
        >
          Search
        </Button>
      </div>
    </ReactModal>
  );

  return (
    <Container>
      <form id='searchForm' className={css.form} onSubmit={handleSubmit}>
        <div className={css.description}>
          <TextField
            label='description'
            placeholder='Filter by title, companies, expertise…'
            icon={isSmUp ? <IconSearch /> : null}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {isSmUp ? extendedSearch : compactSearch}
        {modal}
      </form>
    </Container>
  );
};

export default SearchForm;
