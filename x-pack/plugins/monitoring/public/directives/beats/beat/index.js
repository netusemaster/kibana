/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import { uiModules } from 'ui/modules';
import { Beat } from 'plugins/monitoring/components/beats/beat';

const uiModule = uiModules.get('monitoring/directives', []);
uiModule.directive('monitoringBeatsBeat', (timefilter) => {
  return {
    restrict: 'E',
    scope: {
      data: '=',
    },
    link(scope, $el) {

      function onBrush({ xaxis }) {
        scope.$evalAsync(() => {
          timefilter.time.from = moment(xaxis.from);
          timefilter.time.to = moment(xaxis.to);
          timefilter.time.mode = 'absolute';
        });
      }

      scope.$watch('data', (data = {}) => {
        render((
          <Beat
            summary={data.summary}
            metrics={data.metrics}
            onBrush={onBrush}
          />
        ), $el[0]);
      });

    }
  };
});
