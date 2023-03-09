import { ArrowLongUpIcon, ArrowSmallDownIcon } from '@heroicons/react/20/solid';

const stats = [
  {name: 'Total joined events', stat: '71'},
  {name: 'Total posts', stat: '21', change: '2.02%'},
  {name: 'Total likes', stat: '24', change: '4.05%'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserStats() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Stats in last 30 days</h3>
      <dl
        className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
