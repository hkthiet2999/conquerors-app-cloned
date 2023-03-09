import React from 'react';

const Card = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="https://images.unsplash.com/photo-1612600774269-a2e737c308bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">The shore of Lake Mango is seriously polluted</h2>
        <p>The lakeside is full of domestic waste, wishing to accompany garbage collection and protect the environment.</p>
        <div className="flex justify-between">
          <div>
            <div className="badge badge-outline">District 5</div>
            <div className="badge badge-outline">Ho Chi Minh City</div>
          </div>
          <button className="btn btn-accent">View Detail</button>
        </div>
        <div className={'mt-2'}>
          <progress className="progress progress-success w-full" value="50" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default Card;
