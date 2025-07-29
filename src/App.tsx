import { Button } from './components/Atoms/Button';
import { Avatar } from './components/Atoms/Avatar';
import { Input } from './components/Atoms/Input';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Enhanced Atoms Showcase
          </h1>
          <p className='text-gray-600'>
            Testing enhanced Button, Avatar, and Input components
          </p>
        </div>

        {/* Button Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Button Variants
          </h2>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              <Button variant='primary'>Primary</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='outline'>Outline</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='danger'>Danger</Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button size='xs'>Extra Small</Button>
              <Button size='sm'>Small</Button>
              <Button size='md'>Medium</Button>
              <Button size='lg'>Large</Button>
              <Button size='xl'>Extra Large</Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>

        {/* New Button Features Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            New Button Features
          </h2>
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Border Radius
              </h3>
              <div className='flex flex-wrap gap-2'>
                <Button borderRadius='none'>No Radius</Button>
                <Button borderRadius='sm'>Small</Button>
                <Button borderRadius='md'>Medium</Button>
                <Button borderRadius='lg'>Large</Button>
                <Button borderRadius='xl'>XL</Button>
                <Button borderRadius='full'>Full</Button>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Custom Colors
              </h3>
              <div className='flex flex-wrap gap-2'>
                <Button color='#ffffff' backgroundColor='#8b5cf6'>
                  Purple
                </Button>
                <Button color='#ffffff' backgroundColor='#10b981'>
                  Green
                </Button>
                <Button color='#ffffff' backgroundColor='#f59e0b'>
                  Orange
                </Button>
                <Button color='#1f2937' backgroundColor='#fbbf24'>
                  Yellow
                </Button>
                <Button color='#ffffff' backgroundColor='#ef4444'>
                  Red
                </Button>
                <Button color='#ffffff' backgroundColor='#6366f1'>
                  Indigo
                </Button>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                Combined Features
              </h3>
              <div className='flex flex-wrap gap-2'>
                <Button
                  borderRadius='full'
                  color='#ffffff'
                  backgroundColor='#8b5cf6'
                  size='lg'
                >
                  Rounded Purple
                </Button>
                <Button
                  borderRadius='xl'
                  color='#ffffff'
                  backgroundColor='#10b981'
                  size='lg'
                >
                  XL Green
                </Button>
                <Button
                  borderRadius='none'
                  color='#ffffff'
                  backgroundColor='#f59e0b'
                  size='lg'
                >
                  Square Orange
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Avatar Variants
          </h2>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Avatar alt='John Doe' size='xs' />
              <Avatar alt='John Doe' size='sm' />
              <Avatar alt='John Doe' size='md' />
              <Avatar alt='John Doe' size='lg' />
              <Avatar alt='John Doe' size='xl' />
            </div>
            <div className='flex items-center gap-4'>
              <Avatar alt='Circle' shape='circle' />
              <Avatar alt='Square' shape='square' />
              <Avatar alt='Rounded' shape='rounded' />
            </div>
            <div className='flex items-center gap-4'>
              <Avatar alt='Online' status='online' />
              <Avatar alt='Offline' status='offline' />
              <Avatar alt='Away' status='away' />
              <Avatar alt='Busy' status='busy' />
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Input Variants
          </h2>
          <div className='space-y-4 max-w-md'>
            <Input
              value=''
              onChange={() => {}}
              label='Basic Input'
              placeholder='Enter text...'
            />
            <Input
              value=''
              onChange={() => {}}
              label='With Error'
              placeholder='Error state'
              error='This field is required'
            />
            <Input
              value=''
              onChange={() => {}}
              label='Disabled'
              placeholder='Disabled input'
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
