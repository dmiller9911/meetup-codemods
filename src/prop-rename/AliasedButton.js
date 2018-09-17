import React from 'react';
import { Button as UIButton } from 'react-bootstrap';
import Button from 'other-button';

const defaultBtn = <UIButton>Default Button</UIButton>;

const primaryBtn = <UIButton bsStyle="primary">Primary Button</UIButton>;

const secondaryBtn = <UIButton bsStyle="secondary">Secondary Button</UIButton>;

const otherBtn = <Button bsStyle="secondary">Other Button</Button>;

export { defaultBtn, primaryBtn, secondaryBtn, otherBtn };
