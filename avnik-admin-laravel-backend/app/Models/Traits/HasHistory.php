<?php

namespace App\Models\Traits;

use App\Models\EventHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

trait HasHistory
{
    protected function historyMeta(): array
    {
        // override in model if needed
        return [
            'history_table' => $this->getTable() . '_histories',
            'fk'            => $this->getForeignKeyNameForHistory(), // e.g. event_fk_id / event_time_slot_id / event_booking_id / event_payment_id
        ];
    }
     protected function getForeignKeyNameForHistory(): string
    {
        // Default: <singular_table>_id (you can override per model)
        return Str::singular($this->getTable()) . '_id';
    }

    public static function bootHasHistory(): void
    {
        static::updating(function ($model) {
            $model->writeHistoryRow($model->getOriginal());
        });

        // also track soft deletes
        static::deleting(function ($model) {
            $model->writeHistoryRow($model->getOriginal());
        });
    }
    protected function writeHistoryRow(array $original): void
    {
        $meta = $this->historyMeta();
        $payload = [
            $meta['fk']       => $this->getKey(),
            'data'            => json_encode($original),
            'changed_by'      => optional(Auth::user())->id,
            'change_reason'   => request()->input('change_reason'),
            'created_at'      => now(),
            'updated_at'      => now(),
        ];

        DB::table($meta['history_table'])->insert($payload);
    }
}
